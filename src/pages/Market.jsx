import React, { useState, useEffect } from "react";
import LiveChart from "../components/Market/LiveChart";
import TradingSidebar from "../components/Market/TradingSideBar";
import SymbolSelector from "../components/Market/SymbolSelector";
import IntervalSelector from "../components/Market/IntervalSelector";

const Market = () => {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [interval, setInterval] = useState("1m");
  const [refreshKey, setRefreshKey] = useState(0);

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
    <div key={refreshKey} className="flex h-screen bg-gray-900 text-white">
      {/* Chart + Left Sidebar */}
      <div className="flex flex-1">
        {/* Chart area */}
        <div className="flex-1 relative mr-64"> 
          {/* 👈 margin-right = width of right sidebar */}
          <LiveChart symbol={symbol} interval={interval} />
          <SymbolSelector onChange={setSymbol} />
          <IntervalSelector interval={interval} onChange={setInterval} />
        </div>
      </div>

      {/* Right Sidebar fixed */}
      <div
        className="
          bg-slate-950/80 backdrop-blur-xl text-white shadow-2xl
          flex flex-col border-slate-800
          fixed top-0 right-0 w-64 h-screen border-l z-20
          lg:w-60
        "
      >
        <TradingSidebar symbol={symbol} />
      </div>
    </div>
  );
};

export default Market;
