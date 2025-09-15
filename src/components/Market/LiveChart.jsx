import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";

const LiveChart = ({ symbol, interval }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const countdownRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 🔹 Convert interval string (like "1m", "5m", "1h") into milliseconds
const intervalToMs = (interval) => {
  const unit = interval.slice(-1); // last char (m/h/d/w)
  const value = parseInt(interval.slice(0, -1)); // number part

  switch (unit) {
    case "m": return value * 60 * 1000;
    case "h": return value * 60 * 60 * 1000;
    case "d": return value * 24 * 60 * 60 * 1000;
    case "w": return value * 7 * 24 * 60 * 60 * 1000;
    default: return 60 * 1000; // fallback 1m
  }
};

  // handle fullscreen toggle
  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      chartContainerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // listen for fullscreen change
  useEffect(() => {
    const onFullScreenChange = () => {
      const fsActive = !!document.fullscreenElement;
      setIsFullscreen(fsActive);

      // resize chart when entering/exiting fullscreen
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
        chartRef.current.timeScale().fitContent(); // ensure proper redraw
      }
    };

    document.addEventListener("fullscreenchange", onFullScreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullScreenChange);
  }, []);

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

    chart.priceScale("right").applyOptions({
      tickMarkFormatter: (price) => {
        const rounded = Math.round(price / 10) * 10;
        return rounded.toString();
      },
    });

    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=100`
    )
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

        chart.timeScale().setVisibleLogicalRange({
          from: formatted.length - 50,
          to: formatted.length,
        });
      });

    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`
    );
    ws.onmessage = (event) => {
      const { k: candlestick } = JSON.parse(event.data);
      const time = Math.floor(candlestick.t / 1000);
      const newClose = parseFloat(candlestick.c);

      const duration = 500;
      const start = performance.now();
      const oldClose = candleSeries._lastClose || newClose;

      const animate = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased =
          progress < 1 / 2.75
            ? 7.5625 * progress * progress
            : progress < 2 / 2.75
            ? 7.5625 * (progress - 1.5 / 2.75) ** 2 + 0.75
            : progress < 2.5 / 2.75
            ? 7.5625 * (progress - 2.25 / 2.75) ** 2 + 0.9375
            : 7.5625 * (progress - 2.625 / 2.75) ** 2 + 0.984375;

        const interpolated = oldClose + (newClose - oldClose) * eased;

        candleSeries.update({
          time,
          open: parseFloat(candlestick.o),
          high: parseFloat(candlestick.h),
          low: parseFloat(candlestick.l),
          close: interpolated,
        });

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          candleSeries._lastClose = newClose;
        }
      };

      requestAnimationFrame(animate);

      // const intervalMs = intervalToMs(interval);
      // const nextClose = candlestick.t + intervalMs;
      const nextClose = candlestick.T;

      if (countdownRef.current) clearInterval(countdownRef.current);

      countdownRef.current = setInterval(() => {
        const remaining = Math.max(
          0,
          Math.floor((nextClose - Date.now()) / 1000)
        );
        const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
        const seconds = String(remaining % 60).padStart(2, "0");
        const label = `${minutes}:${seconds}`;

        candleSeries.setMarkers([
          {
            time:Math.floor(candlestick.t / 1000),
            position: "belowBar",
            color: "white",
            text: label,
          },
        ]);
        if (remaining <= 0) {
    clearInterval(countdownRef.current); // stop when candle closed
  }

      }, 1000);
    };

    const clockTimer = setInterval(() => setCurrentTime(new Date()), 1000);

    return () => {
      ws.close();
      chart.remove();
      window.removeEventListener("resize", handleResize);
      if (countdownRef.current) clearInterval(countdownRef.current);
      clearInterval(clockTimer);
    };
  }, [symbol, interval]);

  return (
    <div className="relative h-full w-full" ref={chartContainerRef}>
      {/* fullscreen toggle button */}
      <button
        onClick={handleFullScreen}
        className="absolute top-2 left-2 z-10 bg-black bg-opacity-50 px-3 py-1 rounded text-sm text-white hover:bg-opacity-80"
      >
        {isFullscreen ? "⛶ Exit" : "⛶ Fullscreen"}
      </button>

      {/* clock overlay */}
      <div className="absolute top-2 right-2 bg-black bg-opacity-50 px-3 py-1 rounded text-sm text-white z-10">
        {currentTime.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default LiveChart;
