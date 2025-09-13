import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";

const LiveChart = ({ symbol }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const countdownRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        background: { type: "solid", color: "#111827" },
        textColor: "#d1d4dc",
      },
      grid: {
        vertLines: { color: "rgba(42, 46, 57, 0.5)", style: 0 },
        horzLines: { color: "rgba(42, 46, 57, 0.5)", style: 0 },
      },
      crosshair: { mode: 1 },
      rightPriceScale: {
        scaleMargins: { top: 0.1, bottom: 0.1 },
        borderVisible: true,
        entireTextOnly: true,
        minimumLabelSpacing: 100,
      },
      timeScale: {
        borderVisible: true,
        timeVisible: true,
        secondsVisible: true,
        barSpacing: 25,
        rightOffset: 20,
      },
      handleScroll: {
        mouseWheel: true,
        horzTouchDrag: true,
      },
      handleScale: {
        axisPressedMouseMove: true,
        pinch: true,
        mouseWheel: true,
      },
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
      priceFormat: { type: "price", precision: 2, minMove: 0.01 },
    });

    // Round right price scale
    chart.priceScale("right").applyOptions({
      tickMarkFormatter: (price) => {
        const rounded = Math.round(price / 10) * 10;
        return rounded.toString();
      },
    });

    // Resize handling
    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    // Fetch historical candles
    fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1m&limit=100`)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item) => ({
          time: item[0] / 1000,
          open: parseFloat(item[1]),
          high: parseFloat(item[2]),
          low: parseFloat(item[3]),
          close: parseFloat(item[4]),
        }));
        candleSeries.setData(formatted);

        // Zoom to last 50 candles
        chart.timeScale().setVisibleLogicalRange({
          from: formatted.length - 50,
          to: formatted.length,
        });
      });

    // WebSocket live updates
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_1m`);
    ws.onmessage = (event) => {
      const { k: candlestick } = JSON.parse(event.data);
      const time = Math.floor(candlestick.t / 1000);

      candleSeries.update({
        time,
        open: parseFloat(candlestick.o),
        high: parseFloat(candlestick.h),
        low: parseFloat(candlestick.l),
        close: parseFloat(candlestick.c),
      });

      chart.timeScale().applyOptions({
        rightOffset: 20,
        rightBarStaysOnScroll: true,
      });

      // Candle countdown
      const intervalMs = 60 * 1000; // 1m candle
      const nextClose = candlestick.t + intervalMs;

      if (countdownRef.current) clearInterval(countdownRef.current);

      countdownRef.current = setInterval(() => {
        const remaining = Math.max(0, Math.floor((nextClose - Date.now()) / 1000));
        const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
        const seconds = String(remaining % 60).padStart(2, "0");
        const label = `${minutes}:${seconds}`;

        candleSeries.setMarkers([
          {
            time,
            position: "belowBar",
            color: "white",
            text: label,
          },
        ]);
      }, 1000);
    };

    // Live clock
    const clockTimer = setInterval(() => setCurrentTime(new Date()), 1000);

    return () => {
      ws.close();
      chart.remove();
      window.removeEventListener("resize", handleResize);
      if (countdownRef.current) clearInterval(countdownRef.current);
      clearInterval(clockTimer);
    };
  }, [symbol]);

  return (
    <div className="h-full w-full relative">
      <div ref={chartContainerRef} className="h-full w-full">
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 px-3 py-1 rounded text-sm">
          {currentTime.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default LiveChart;
