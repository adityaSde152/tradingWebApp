
import React, { useState } from "react";
import LiveChart from "../components/Market/LiveChart"; // move your chart code into LiveChart.jsx
import TradingSidebar from "../components/Market/TradingSideBar";
import SymbolSelector from "../components/Market/SymbolSelector";

const Market = () => {
  const [symbol, setSymbol] = useState("BTCUSDT");

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Chart area */}
      <div className="flex-1 relative">
        <LiveChart symbol={symbol} />
        <SymbolSelector onChange={setSymbol} />
      </div>

      {/* Sidebar */}
      <TradingSidebar symbol={symbol} />
    </div>
  );
};

export default Market;
