import React, { useState, useEffect } from "react";
import LiveChart from "../components/Market/LiveChart";
import TradingSidebar from "../components/Market/TradingSideBar";
import SymbolSelector from "../components/Market/SymbolSelector";
import IntervalSelector from "../components/Market/IntervalSelector"; // new

const Market = () => {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [interval, setInterval] = useState("1m"); // default interval
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
      {/* Chart area */}
      <div className="flex-1 relative">
        <LiveChart symbol={symbol} interval={interval} />
        <SymbolSelector onChange={setSymbol} />
        <IntervalSelector interval={interval} onChange={setInterval} />
      </div>

      {/* Sidebar */}
      <TradingSidebar symbol={symbol} />
    </div>
  );
};

export default Market;
