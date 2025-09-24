import React, { useEffect, useState } from "react";
import LiveChart from "../components/Market/LiveChart";
import TradingSideBar from "../components/Market/TradingSideBar";
import SymbolSelector from "../components/Market/SymbolSelector";
import IntervalSelector from "../components/Market/IntervalSelector";
// import DashboardSidebar from "../components/Dashboard/DashboardSidebar";

const Market = () => {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [interval, setInterval] = useState("1m");
  const [refreshKey, setRefreshKey] = useState(0);
  
  // ✅ NEW: Add hover state management
  const [tradeHoverState, setTradeHoverState] = useState(null);

  // ✅ NEW: Handle trade button hover
  const handleTradeHover = (direction) => {
    setTradeHoverState(direction); // 'UP', 'DOWN', or null
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setRefreshKey((prev) => prev + 1);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div 
      key={refreshKey} 
      className="flex h-screen bg-gray-900 text-white overflow-hidden"
    >
      {/* Left: dashboard sidebar (uncomment if needed) */}
      {/* <DashboardSidebar /> */}

      {/* Center: chart area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        {/* Chart container (fills remaining height) */}
        <div 
          className="flex-1 relative min-h-0 min-w-0"
          style={{
            // Ensure the chart container takes up available space
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Chart takes full available space */}
          <div className="flex-1 relative min-h-0 min-w-0">
            <LiveChart 
              symbol={symbol} 
              interval={interval}
              tradeHoverState={tradeHoverState} // ✅ Pass hover state to chart
            />
          </div>
          
          {/* Overlayed controls */}
          <SymbolSelector onChange={setSymbol} />
          <IntervalSelector interval={interval} onChange={setInterval} />
        </div>
      </div>

      {/* Right: trading sidebar */}
      <TradingSideBar 
        symbol={symbol} 
        onSwitch={() => {
          // Optional: add symbol switch logic here
        }}
        onTradeHover={handleTradeHover} // ✅ Pass hover handler to sidebar
      />
    </div>
  );
};

export default Market;
