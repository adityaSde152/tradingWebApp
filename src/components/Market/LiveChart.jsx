import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { createChart } from "lightweight-charts";
import { useTrade } from "../../context/TradeContext";

const LiveChart = ({ symbol, interval }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const candleSeriesRef = useRef(null);
  const countdownRef = useRef(null);
  const resizeTimeoutRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastSizeRef = useRef({ width: 0, height: 0 });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);

  const { trades } = useTrade();

  const handleFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
      chartContainerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const getPricePrecision = useCallback((price) => {
    if (price >= 10) return 2;
    if (price >= 1) return 4;
    if (price >= 0.01) return 5;
    return 6;
  }, []);

  // Optimized chart configuration - memoized to prevent recreations
  const chartConfig = useMemo(() => ({
    width: 800, // Initial size, will be updated
    height: 600,
    layout: { 
      background: { type: "solid", color: "#111827" }, 
      textColor: "#d1d4dc",
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif'
    },
    grid: {
      vertLines: { color: "rgba(42,46,57,0.5)", style: 0 },
      horzLines: { color: "rgba(42,46,57,0.5)", style: 0 },
    },
    crosshair: { mode: 1 },
    rightPriceScale: {
      scaleMargins: { top: 0.1, bottom: 0.1 },
      borderVisible: true,
      entireTextOnly: true,
      autoScale: true,
      alignLabels: true,
    },
    timeScale: {
      borderVisible: true,
      timeVisible: true,
      secondsVisible: true,
      barSpacing: 25,
      rightOffset: 20,
      fixLeftEdge: false, // Better performance
      fixRightEdge: false,
    },
    handleScroll: { 
      mouseWheel: true, 
      horzTouchDrag: true,
      vertTouchDrag: false // Disable vertical touch for better mobile performance
    },
    handleScale: { 
      axisPressedMouseMove: true, 
      pinch: true, 
      mouseWheel: true 
    },
    // Performance optimizations
    trackingMode: {
      exitMode: 0 // Faster tracking mode
    }
  }), []);

  // Super fast resize handler using RAF and size comparison
  const handleResize = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const el = chartContainerRef.current;
      const ch = chartRef.current;
      if (!el || !ch) return;

      const rect = el.getBoundingClientRect();
      const width = Math.max(300, Math.round(rect.width));
      const height = Math.max(200, Math.round(rect.height));

      // Only resize if dimensions actually changed (prevents unnecessary redraws)
      if (lastSizeRef.current.width !== width || lastSizeRef.current.height !== height) {
        lastSizeRef.current = { width, height };
        
        ch.applyOptions({
          width: width,
          height: height,
        });
      }
    });
  }, []);

  // Throttled resize for window events
  const throttledResize = useCallback(() => {
    if (resizeTimeoutRef.current) return;
    
    resizeTimeoutRef.current = setTimeout(() => {
      handleResize();
      resizeTimeoutRef.current = null;
    }, 16); // ~60fps throttling
  }, [handleResize]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const container = chartContainerRef.current;
    const rect = container.getBoundingClientRect();
    
    // Initialize with actual container size
    const initialConfig = {
      ...chartConfig,
      width: Math.max(300, Math.round(rect.width)),
      height: Math.max(200, Math.round(rect.height))
    };
    
    const chart = createChart(container, initialConfig);
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
      // Performance optimizations
      lastValueVisible: true,
      priceLineWidth: 1,
    });

    candleSeriesRef.current = candleSeries;

    // High-performance ResizeObserver
    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver((entries) => {
        // Use the more efficient contentRect
        for (const entry of entries) {
          if (entry.target === container) {
            const { width, height } = entry.contentRect;
            const roundedWidth = Math.max(300, Math.round(width));
            const roundedHeight = Math.max(200, Math.round(height));
            
            if (lastSizeRef.current.width !== roundedWidth || 
                lastSizeRef.current.height !== roundedHeight) {
              lastSizeRef.current = { width: roundedWidth, height: roundedHeight };
              
              // Use RAF for smooth updates
              if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
              }
              
              animationFrameRef.current = requestAnimationFrame(() => {
                chartRef.current?.applyOptions({
                  width: roundedWidth,
                  height: roundedHeight,
                });
              });
            }
          }
        }
      });
      ro.observe(container);
    }

    // Fallback window resize (throttled)
    window.addEventListener("resize", throttledResize, { passive: true });

    // Optimized fullscreen handler
    const onFsChange = () => {
      const isFs = !!document.fullscreenElement;
      setIsFullscreen(isFs);
      // Immediate resize on fullscreen change
      setTimeout(handleResize, 50);
    };
    document.addEventListener("fullscreenchange", onFsChange, { passive: true });

    // Optimized zoom constraints
    const timeScale = chart.timeScale();
    const MIN_SPACING = 8;
    const MAX_SPACING = 60;
    
    let lastSpacing = 25;
    timeScale.subscribeVisibleTimeRangeChange(() => {
      const options = timeScale.options();
      const spacing = options.barSpacing || 25;
      
      // Only update if spacing changed significantly (reduces redraws)
      if (Math.abs(spacing - lastSpacing) > 1) {
        const clampedSpacing = Math.max(MIN_SPACING, Math.min(MAX_SPACING, spacing));
        if (clampedSpacing !== spacing) {
          timeScale.applyOptions({ barSpacing: clampedSpacing });
        }
        lastSpacing = clampedSpacing;
      }
    });

    // Optimized data fetching with error handling
    const fetchHistoricalData = async () => {
      try {
        const response = await fetch(
          `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=100`,
          { 
            signal: AbortSignal.timeout(10000) // 10s timeout
          }
        );
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        const formatted = data.map((item) => ({
          time: item[0] / 1000,
          open: parseFloat(item[1]),
          high: parseFloat(item[2]),
          low: parseFloat(item[3]),
          close: parseFloat(item[4]),
        }));

        if (formatted.length === 0) return;

        const latestClose = formatted[formatted.length - 1].close;
        const precision = getPricePrecision(latestClose);
        
        // Batch updates for better performance
        candleSeries.applyOptions({
          priceFormat: { type: "price", precision, minMove: 10 ** -precision },
        });

        chart.priceScale("right").applyOptions({
          tickMarkFormatter: (price) => price.toFixed(getPricePrecision(price)),
        });

        candleSeries.setData(formatted);
        
        // Optimized visible range
        requestAnimationFrame(() => {
          chart.timeScale().setVisibleLogicalRange({ 
            from: Math.max(0, formatted.length - 50), 
            to: formatted.length 
          });
        });
        
      } catch (err) {
        console.warn("Historical data fetch failed:", err.message);
      }
    };

    fetchHistoricalData();

    // Optimized WebSocket connection
    let ws;
    let wsReconnectTimer;
    
    const connectWebSocket = () => {
      try {
        ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`);
        
        ws.onopen = () => console.log("WebSocket connected");
        
        ws.onmessage = (event) => {
          try {
            const { k } = JSON.parse(event.data);
            const time = Math.floor(k.t / 1000);
            const candle = {
              time,
              open: parseFloat(k.o),
              high: parseFloat(k.h),
              low: parseFloat(k.l),
              close: parseFloat(k.c),
            };
            
            // Batch candle updates
            candleSeries.update(candle);

            // Global state updates (throttled)
            window.latestCandleColor = k.c > k.o ? "green" : "red";
            window.latestCandleClose = parseFloat(k.c);

            // Optimized countdown with less frequent updates
            const nextClose = k.T;
            if (countdownRef.current) clearInterval(countdownRef.current);
            
            countdownRef.current = setInterval(() => {
              const remaining = Math.max(0, Math.floor((nextClose - Date.now()) / 1000));
              const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
              const seconds = String(remaining % 60).padStart(2, "0");

              // Only update markers if they exist (performance check)
              if (candleSeriesRef.current) {
                const tradeMarkers = candleSeriesRef.current.markers()?.filter((m) => m.id?.startsWith("trade_")) || [];
                const allMarkers = [
                  ...tradeMarkers,
                  { 
                    id: "countdown", 
                    time, 
                    position: "belowBar", 
                    color: "#ffffff", 
                    text: `${minutes}:${seconds}`,
                    size: "small" // Smaller markers for performance
                  },
                ];
                
                // Sort once and update
                allMarkers.sort((a, b) => a.time - b.time);
                candleSeriesRef.current.setMarkers(allMarkers);
              }

              if (remaining <= 0) clearInterval(countdownRef.current);
            }, 1000);
            
          } catch (parseErr) {
            console.warn("WebSocket message parse error:", parseErr);
          }
        };

        ws.onerror = (error) => {
          console.warn("WebSocket error:", error);
        };

        ws.onclose = () => {
          console.log("WebSocket closed, attempting reconnect...");
          wsReconnectTimer = setTimeout(connectWebSocket, 3000);
        };
        
      } catch (err) {
        console.warn("WebSocket connection failed:", err);
        wsReconnectTimer = setTimeout(connectWebSocket, 5000);
      }
    };

    connectWebSocket();

    // Optimized clock timer (only when needed)
    const clockTimer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup function
    return () => {
      // Cancel any pending animation frames
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      
      if (wsReconnectTimer) {
        clearTimeout(wsReconnectTimer);
      }
      
      if (ws && ws.readyState <= WebSocket.OPEN) {
        ws.close();
      }
      
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
      
      if (ro) ro.disconnect();
      window.removeEventListener("resize", throttledResize);
      document.removeEventListener("fullscreenchange", onFsChange);
      
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
      
      clearInterval(clockTimer);
    };
  }, [symbol, interval, chartConfig, throttledResize, handleResize, getPricePrecision]);

  // Optimized trade markers with memoization
  const tradeMarkers = useMemo(() => {
    return trades
      .filter((t) => t.symbol === symbol && t.remaining > 0)
      .map((t, idx) => ({
        id: `trade_${idx}`,
        time: Math.floor(Date.now() / 1000),
        position: "aboveBar",
        color: t.direction === "UP" ? "#00c853" : "#d50000",
        shape: "arrowDown",
        text: `${t.direction} ${t.remaining}s`,
        size: "small"
      }));
  }, [trades, symbol]);

  // Apply trade markers efficiently
  useEffect(() => {
    if (!candleSeriesRef.current) return;

    const currentMarkers = candleSeriesRef.current.markers()?.filter((m) => !m.id?.startsWith("trade_")) || [];
    const allMarkers = [...currentMarkers, ...tradeMarkers];
    
    allMarkers.sort((a, b) => a.time - b.time);
    candleSeriesRef.current.setMarkers(allMarkers);
  }, [tradeMarkers]);

  return (
    <div 
      ref={chartContainerRef} 
      className="relative w-full h-full min-w-0 min-h-0 will-change-auto"
      style={{ 
        minHeight: '300px',
        minWidth: '250px',
        contain: 'layout style size' // CSS containment for better performance
      }}
    >
      <button
        onClick={handleFullScreen}
        className="absolute top-2 right-20 z-10 bg-black/60 hover:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-md text-sm text-white transition-all duration-150 will-change-transform"
      >
        {isFullscreen ? "⛶ Exit" : "⛶"}
      </button>
      {/* <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-md text-sm text-white z-10 font-mono">
        {currentTime.toLocaleTimeString()}
      </div> */}
    </div>
  );
};

export default LiveChart;