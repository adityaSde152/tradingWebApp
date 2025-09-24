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

  // Enhanced refs for legend & tooltip
  const legendRef = useRef(null);
  const tooltipRef = useRef(null);

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

  const chartConfig = useMemo(() => ({
    width: 800,
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
      fixLeftEdge: false,
      fixRightEdge: false,
    },
    handleScroll: { 
      mouseWheel: true, 
      horzTouchDrag: true,
      vertTouchDrag: false
    },
    handleScale: { 
      axisPressedMouseMove: true, 
      pinch: true, 
      mouseWheel: true 
    },
    trackingMode: {
      exitMode: 0
    }
  }), []);

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

      if (lastSizeRef.current.width !== width || lastSizeRef.current.height !== height) {
        lastSizeRef.current = { width, height };
        ch.applyOptions({ width, height });
      }
    });
  }, []);

  const throttledResize = useCallback(() => {
    if (resizeTimeoutRef.current) return;
    
    resizeTimeoutRef.current = setTimeout(() => {
      handleResize();
      resizeTimeoutRef.current = null;
    }, 16);
  }, [handleResize]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const container = chartContainerRef.current;
    const rect = container.getBoundingClientRect();
    
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
      lastValueVisible: true,
      priceLineWidth: 1,
    });

    candleSeriesRef.current = candleSeries;

    // ========== ENHANCED LEGEND & TOOLTIP CREATION ==========
    // Create enhanced legend element positioned at bottom-left
    const legendEl = document.createElement("div");
    legendEl.style.cssText = `
      position: absolute;
      bottom: 12px;
      left: 12px;
      padding: 12px 16px;
      background: rgba(17, 24, 39, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(75, 85, 99, 0.3);
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      color: #ffffff;
      font-family: ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 13px;
      line-height: 1.4;
      z-index: 1000;
      pointer-events: none;
      transition: all 0.2s ease-in-out;
      min-width: 320px;
      max-width: 400px;
    `;
    container.appendChild(legendEl);
    legendRef.current = legendEl;

    // Create enhanced tooltip element with transparent background and subtle blur
    const tooltipEl = document.createElement("div");
    tooltipEl.style.cssText = `
      position: absolute;
      display: none;
      pointer-events: none;
      padding: 14px 18px;
      background: rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid rgba(156, 163, 175, 0.15);
      border-radius: 16px;
      box-shadow: 0 8px 25px -8px rgba(0, 0, 0, 0.2);
      color: #ffffff;
      font-family: ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 12px;
      line-height: 1.5;
      z-index: 1001;
      transform: translateY(-4px);
      transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
      min-width: 180px;
      max-width: 220px;
    `;
    container.appendChild(tooltipEl);
    tooltipRef.current = tooltipEl;
    // ========================================================

    // High-performance ResizeObserver
    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.target === container) {
            const { width, height } = entry.contentRect;
            const roundedWidth = Math.max(300, Math.round(width));
            const roundedHeight = Math.max(200, Math.round(height));
            
            if (lastSizeRef.current.width !== roundedWidth || lastSizeRef.current.height !== roundedHeight) {
              lastSizeRef.current = { width: roundedWidth, height: roundedHeight };
              if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
              animationFrameRef.current = requestAnimationFrame(() => {
                chartRef.current?.applyOptions({ width: roundedWidth, height: roundedHeight });
              });
            }
          }
        }
      });
      ro.observe(container);
    }

    window.addEventListener("resize", throttledResize, { passive: true });

    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      setTimeout(handleResize, 50);
    };
    document.addEventListener("fullscreenchange", onFsChange, { passive: true });

    const timeScale = chart.timeScale();
    const MIN_SPACING = 8;
    const MAX_SPACING = 60;
    let lastSpacing = 25;
    timeScale.subscribeVisibleTimeRangeChange(() => {
      const options = timeScale.options();
      const spacing = options.barSpacing || 25;
      if (Math.abs(spacing - lastSpacing) > 1) {
        const clampedSpacing = Math.max(MIN_SPACING, Math.min(MAX_SPACING, spacing));
        if (clampedSpacing !== spacing) timeScale.applyOptions({ barSpacing: clampedSpacing });
        lastSpacing = clampedSpacing;
      }
    });

    // ========== ENHANCED CROSSHAIR HANDLER ==========
    const crosshairHandler = (param) => {
      try {
        if (!param || !param.time || !param.point) {
          if (tooltipRef.current) {
            tooltipRef.current.style.display = "none";
            tooltipRef.current.style.opacity = "0";
          }
          return;
        }

        let bar;
        if (param.seriesData && typeof param.seriesData.get === "function") {
          bar = param.seriesData.get(candleSeries);
        } else if (param.seriesData && candleSeries in param.seriesData) {
          bar = param.seriesData[candleSeries];
        }

        if (!bar && param.seriesPrices && typeof param.seriesPrices.get === "function") {
          const priceObj = param.seriesPrices.get(candleSeries);
          if (priceObj && typeof priceObj === "object") {
            bar = priceObj;
          } else if (typeof priceObj === "number") {
            bar = { open: priceObj, high: priceObj, low: priceObj, close: priceObj };
          }
        }

        if (!bar) {
          if (tooltipRef.current) {
            tooltipRef.current.style.display = "none";
            tooltipRef.current.style.opacity = "0";
          }
          return;
        }

        const prec = getPricePrecision(bar.close ?? 0);
        const fmt = (v) => (typeof v === "number" ? v.toFixed(prec) : v);
        
        // Calculate price change
        const change = bar.close - bar.open;
        const changePercent = ((change / bar.open) * 100);
        const isPositive = change >= 0;

        // Enhanced legend with more information
        if (legendRef.current) {
          legendRef.current.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <!-- Header Row -->
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <div style="font-weight: 600; font-size: 14px; color: #60a5fa;">${symbol}</div>
                  <div style="font-size: 11px; color: #9ca3af; text-transform: uppercase;">${interval}</div>
                </div>
                <div style="font-size: 11px; color: #d1d5db;">
                  ${new Date(param.time * 1000).toLocaleDateString()} ${new Date(param.time * 1000).toLocaleTimeString()}
                </div>
              </div>
              
              <!-- OHLC Row -->
              <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; font-size: 12px;">
                <div style="display: flex; flex-direction: column; align-items: center;">
                  <span style="color: #9ca3af; font-size: 10px; margin-bottom: 2px;">OPEN</span>
                  <span style="color: #ffffff; font-weight: 500;">${fmt(bar.open)}</span>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center;">
                  <span style="color: #9ca3af; font-size: 10px; margin-bottom: 2px;">HIGH</span>
                  <span style="color: #22c55e; font-weight: 500;">${fmt(bar.high)}</span>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center;">
                  <span style="color: #9ca3af; font-size: 10px; margin-bottom: 2px;">LOW</span>
                  <span style="color: #ef4444; font-weight: 500;">${fmt(bar.low)}</span>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center;">
                  <span style="color: #9ca3af; font-size: 10px; margin-bottom: 2px;">CLOSE</span>
                  <span style="color: #ffffff; font-weight: 500;">${fmt(bar.close)}</span>
                </div>
              </div>
              
              <!-- Change Row -->
              <div style="display: flex; justify-content: center; align-items: center; gap: 8px; padding-top: 4px; border-top: 1px solid rgba(75, 85, 99, 0.3);">
                <span style="color: ${isPositive ? '#22c55e' : '#ef4444'}; font-weight: 600; font-size: 13px;">
                  ${isPositive ? '+' : ''}${fmt(change)}
                </span>
                <span style="color: ${isPositive ? '#22c55e' : '#ef4444'}; font-weight: 500; font-size: 12px;">
                  (${isPositive ? '+' : ''}${changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          `;
        }

        // Enhanced tooltip
        if (tooltipRef.current && param.point) {
          const containerRect = container.getBoundingClientRect();
          let left = param.point.x + 15;
          let top = param.point.y - 10;

          // Prevent tooltip from going off-screen
          if (left + 220 > containerRect.width) {
            left = param.point.x - 235;
          }
          if (top < 10) {
            top = param.point.y + 15;
          }

          tooltipRef.current.style.left = `${Math.max(10, left)}px`;
          tooltipRef.current.style.top = `${Math.max(10, top)}px`;
          tooltipRef.current.style.display = "block";
          tooltipRef.current.style.opacity = "1";

          tooltipRef.current.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <!-- Time Header -->
              <div style="text-align: center; padding-bottom: 6px; border-bottom: 1px solid rgba(156, 163, 175, 0.2);">
                <div style="font-weight: 600; font-size: 12px; color: #60a5fa; margin-bottom: 2px;">
                  ${new Date(param.time * 1000).toLocaleDateString()}
                </div>
                <div style="font-size: 11px; color: #d1d5db;">
                  ${new Date(param.time * 1000).toLocaleTimeString()}
                </div>
              </div>
              
              <!-- Price Data -->
              <div style="display: flex; flex-direction: column; gap: 4px; font-size: 11px;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #9ca3af;">Open:</span>
                  <span style="color: #ffffff; font-weight: 500;">${fmt(bar.open)}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #9ca3af;">High:</span>
                  <span style="color: #22c55e; font-weight: 500;">${fmt(bar.high)}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #9ca3af;">Low:</span>
                  <span style="color: #ef4444; font-weight: 500;">${fmt(bar.low)}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #9ca3af;">Close:</span>
                  <span style="color: #ffffff; font-weight: 500;">${fmt(bar.close)}</span>
                </div>
              </div>
              
              <!-- Change Indicator -->
              <div style="text-align: center; padding-top: 6px; border-top: 1px solid rgba(156, 163, 175, 0.2);">
                <div style="color: ${isPositive ? '#22c55e' : '#ef4444'}; font-weight: 600; font-size: 11px;">
                  ${isPositive ? '+' : ''}${fmt(change)} (${isPositive ? '+' : ''}${changePercent.toFixed(2)}%)
                </div>
              </div>
            </div>
          `;
        }
      } catch (err) {
        console.warn("crosshair handler error:", err);
      }
    };

    chart.subscribeCrosshairMove(crosshairHandler);
    // ===============================================

    // Data fetching and WebSocket logic (keeping original implementation)
    const fetchHistoricalData = async () => {
      try {
        const response = await fetch(
          `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=500`,
          { signal: AbortSignal.timeout(10000) }
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
        
        candleSeries.applyOptions({
          priceFormat: { type: "price", precision, minMove: 10 ** -precision },
        });

        chart.priceScale("right").applyOptions({
          tickMarkFormatter: (price) => price.toFixed(getPricePrecision(price)),
        });

        candleSeries.setData(formatted);
        
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

    // WebSocket connection (keeping original implementation)
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
            
            candleSeries.update(candle);
            window.latestCandleColor = k.c > k.o ? "green" : "red";
            window.latestCandleClose = parseFloat(k.c);

            const nextClose = k.T;
            if (countdownRef.current) clearInterval(countdownRef.current);
            
            countdownRef.current = setInterval(() => {
              const remaining = Math.max(0, Math.floor((nextClose - Date.now()) / 1000));
              const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
              const seconds = String(remaining % 60).padStart(2, "0");

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
                    size: "small"
                  },
                ];
                
                allMarkers.sort((a, b) => a.time - b.time);
                candleSeriesRef.current.setMarkers(allMarkers);
              }

              if (remaining <= 0) clearInterval(countdownRef.current);
            }, 1000);
            
          } catch (parseErr) {
            console.warn("WebSocket message parse error:", parseErr);
          }
        };

        ws.onerror = (error) => console.warn("WebSocket error:", error);
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

    const clockTimer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup function
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      if (wsReconnectTimer) clearTimeout(wsReconnectTimer);
      if (ws && ws.readyState <= WebSocket.OPEN) ws.close();

      try {
        chartRef.current?.unsubscribeCrosshairMove(crosshairHandler);
      } catch(e) {}

      if (tooltipRef.current) {
        try { tooltipRef.current.remove(); } catch(e) {}
        tooltipRef.current = null;
      }
      if (legendRef.current) {
        try { legendRef.current.remove(); } catch(e) {}
        legendRef.current = null;
      }

      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }

      if (ro) ro.disconnect();
      window.removeEventListener("resize", throttledResize);
      document.removeEventListener("fullscreenchange", onFsChange);
      if (countdownRef.current) clearInterval(countdownRef.current);
      clearInterval(clockTimer);
    };
  }, [symbol, interval, chartConfig, throttledResize, handleResize, getPricePrecision]);

  // Trade markers logic (keeping original implementation)
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
        contain: 'layout style size'
      }}
    >
      <button
        onClick={handleFullScreen}
        className="absolute top-2 right-20 z-10 bg-black/60 hover:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-md text-sm text-white transition-all duration-150 will-change-transform"
      >
        {isFullscreen ? "⛶ Exit" : "⛶"}
      </button>
    </div>
  );
};

export default LiveChart;