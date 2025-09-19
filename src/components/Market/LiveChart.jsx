import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import { useTrade } from "../../context/TradeContext";

const LiveChart = ({ symbol, interval }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const candleSeriesRef = useRef(null);
  const countdownRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);

  const { trades } = useTrade();

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      chartContainerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const getPricePrecision = (price) => {
    if (price >= 10) return 2;
    if (price >= 1) return 4;
    if (price >= 0.01) return 5;
    return 6; // for very small coins
  };

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: { background: { type: "solid", color: "#111827" }, textColor: "#d1d4dc" },
      grid: {
        vertLines: { color: "rgba(42,46,57,0.5)", style: 0 },
        horzLines: { color: "rgba(42,46,57,0.5)", style: 0 },
      },
      crosshair: { mode: 1 },
      rightPriceScale: {
        scaleMargins: { top: 0.1, bottom: 0.1 },
        borderVisible: true,
        entireTextOnly: true,
        minimumLabelSpacing: 100,
      },
      timeScale: { borderVisible: true, timeVisible: true, secondsVisible: true, barSpacing: 25, rightOffset: 20 },
      handleScroll: { mouseWheel: true, horzTouchDrag: true },
      handleScale: { axisPressedMouseMove: true, pinch: true, mouseWheel: true },
    });

    chartRef.current = chart;

    const candleSeries = chart.addCandlestickSeries({
      upColor: "#00c853",
      downColor: "#d50000",
      borderUpColor: "#00c853",
      borderDownColor: "#d50000",
      wickUpColor: "#00c853",
      wickDownColor: "#d50000",
      priceLineVisible: true,
      priceFormat: { type: "price", precision: 2, minMove: 0.01 }, // temp, will update after fetch
    });

    candleSeriesRef.current = candleSeries;

    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    // Fetch historical candles
    fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=100`)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item) => ({
          time: item[0] / 1000,
          open: parseFloat(item[1]),
          high: parseFloat(item[2]),
          low: parseFloat(item[3]),
          close: parseFloat(item[4]),
        }));

        // Update price precision dynamically based on last close
        const latestClose = formatted[formatted.length - 1].close;
        const precision = getPricePrecision(latestClose);
        candleSeries.applyOptions({
          priceFormat: { type: "price", precision, minMove: 10 ** -precision },
        });

        chart.priceScale("right").applyOptions({
          tickMarkFormatter: (price) => price.toFixed(getPricePrecision(price)),
          autoScale: true,
        });

        candleSeries.setData(formatted);
        chart.timeScale().setVisibleLogicalRange({ from: formatted.length - 50, to: formatted.length });
      });

    // WebSocket for live candles
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`);

    ws.onmessage = (event) => {
      const { k } = JSON.parse(event.data);
      const time = Math.floor(k.t / 1000);
      const candle = {
        time,
        open: parseFloat(k.o),
        high: parseFloat(k.h),
        low: parseFloat(k.l),
        close: parseFloat(k.c),
      };
      candleSeries.update(candle);

      window.latestCandleColor = k.c > k.o ? "green" : "red";
      window.latestCandleClose = parseFloat(k.c);

      const nextClose = k.T;

      if (countdownRef.current) clearInterval(countdownRef.current);
      countdownRef.current = setInterval(() => {
        const remaining = Math.max(0, Math.floor((nextClose - Date.now()) / 1000));
        const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
        const seconds = String(remaining % 60).padStart(2, "0");

        const tradeMarkers = candleSeriesRef.current?.markers()?.filter((m) => m.id?.startsWith("trade_")) || [];

        const allMarkers = [
          ...tradeMarkers,
          { id: "countdown", time, position: "belowBar", color: "white", text: `${minutes}:${seconds}` },
        ];

        allMarkers.sort((a, b) => a.time - b.time);
        candleSeriesRef.current.setMarkers(allMarkers);

        if (remaining <= 0) clearInterval(countdownRef.current);
      }, 1000);
    };

    ws.onerror = () => console.warn("WebSocket error, ignoring...");

    const clockTimer = setInterval(() => setCurrentTime(new Date()), 1000);

    return () => {
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) ws.close();
      chart.remove();
      window.removeEventListener("resize", handleResize);
      if (countdownRef.current) clearInterval(countdownRef.current);
      clearInterval(clockTimer);
    };
  }, [symbol, interval]);

  // Trade markers
  useEffect(() => {
    if (!candleSeriesRef.current) return;

    const activeTrades = trades
      .filter((t) => t.symbol === symbol && t.remaining > 0)
      .map((t, idx) => ({
        id: `trade_${idx}`,
        time: Math.floor(Date.now() / 1000),
        position: "aboveBar",
        color: t.direction === "UP" ? "green" : "red",
        shape: "arrowDown",
        text: `${t.direction} ${t.remaining}s`,
      }));

    const countdownMarker = candleSeriesRef.current
      .markers()
      ?.find((m) => m.id === "countdown");

    if (countdownMarker) activeTrades.push(countdownMarker);

    activeTrades.sort((a, b) => a.time - b.time);
    candleSeriesRef.current.setMarkers(activeTrades);
  }, [trades, symbol]);

  return (
    <div className="relative h-full w-full" ref={chartContainerRef}>
      <button
        onClick={handleFullScreen}
        className="absolute top-2 right-20 z-10 bg-black bg-opacity-50 px-3 py-1 rounded text-sm text-white hover:bg-opacity-80"
      >
        {isFullscreen ? "⛶ Exit" : "⛶"}
      </button>
      <div className="absolute top-2 right-2 bg-black bg-opacity-50 px-3 py-1 rounded text-sm text-white z-10">
        {currentTime.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default LiveChart;
