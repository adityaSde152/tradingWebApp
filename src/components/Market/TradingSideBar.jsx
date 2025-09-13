import React, { useState, useEffect } from "react";
import { ChevronDown, Plus, Minus, ShoppingCart } from "lucide-react";

const SYMBOL_META = {
  BTCUSDT: { name: "Bitcoin", icon: "₿", color: "bg-orange-500" },
  ETHUSDT: { name: "Ethereum", icon: "Ξ", color: "bg-indigo-500" },
  BNBUSDT: { name: "BNB", icon: "Ⓑ", color: "bg-yellow-400 text-black" },
  SOLUSDT: { name: "Solana", icon: "◎", color: "bg-purple-500" },
};

const TradingSidebar = ({ symbol }) => {
  const [timeMinutes, setTimeMinutes] = useState(1);
  const [timeSeconds, setTimeSeconds] = useState(0);
  const [investment, setInvestment] = useState(10000);
  const [price, setPrice] = useState(null);

  const formatTime = () => {
    const hours = Math.floor(timeMinutes / 60);
    const mins = timeMinutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${timeSeconds.toString().padStart(2, "0")}`;
  };

  const increaseTime = () => {
    if (timeSeconds < 59) {
      setTimeSeconds(timeSeconds + 1);
    } else {
      setTimeSeconds(0);
      setTimeMinutes(timeMinutes + 1);
    }
  };

  const decreaseTime = () => {
    if (timeSeconds > 0) {
      setTimeSeconds(timeSeconds - 1);
    } else if (timeMinutes > 0) {
      setTimeSeconds(59);
      setTimeMinutes(timeMinutes - 1);
    }
  };

  // 🔹 Fetch live price for selected symbol
  useEffect(() => {
    if (!symbol) return;

    const fetchPrice = async () => {
      try {
        const res = await fetch(
          `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
        );
        const data = await res.json();
        setPrice(parseFloat(data.price).toFixed(2));
      } catch (err) {
        console.error("Error fetching price:", err);
      }
    };

    fetchPrice();

    // refresh every 5s
    const interval = setInterval(fetchPrice, 5000);
    return () => clearInterval(interval);
  }, [symbol]);

  const meta = SYMBOL_META[symbol] || {
    name: symbol,
    icon: "?",
    color: "bg-gray-500",
  };

  return (
    <div className="w-80 bg-slate-800 text-white h-screen flex flex-col overflow-y-auto">
  {/* Header Buttons */}
  <div className="flex p-4 gap-2">
    <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-sm font-medium transition-colors">
      + Deposit
    </button>
    <button className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-sm font-medium transition-colors">
      Withdrawal
    </button>
  </div>

  {/* Symbol Section */}
  <div className="px-4 mb-4">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <div className={`w-6 h-6 ${meta.color} rounded-full flex items-center justify-center`}>
          <span className="text-xs font-bold">{meta.icon}</span>
        </div>
        <span className="font-medium text-sm">{meta.name} (OTC)</span>
      </div>
      <span className="text-green-400 text-sm font-medium">65%</span>
    </div>

    <div className="flex items-center gap-2 text-xs text-blue-400 mb-2">
      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
      <span>PENDING TRADE</span>
    </div>

    <div className="text-right text-xl font-mono">{price ? price : "Loading..."}</div>
  </div>

  {/* Time Section */}
  <div className="px-4 mb-4">
    <div className="mb-2">
      <span className="text-gray-300 text-sm">Time</span>
    </div>
    <div className="flex items-center justify-center gap-2">
      <button
        className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
        onClick={decreaseTime}
      >
        <Minus size={14} className="text-gray-300" />
      </button>
      <div className="bg-gray-700 px-4 py-2 rounded font-mono text-center flex-1 text-white">
        {formatTime()}
      </div>
      <button
        className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
        onClick={increaseTime}
      >
        <Plus size={14} className="text-gray-300" />
      </button>
    </div>
  </div>

  {/* Investment Section */}
  <div className="px-4 mb-4">
    <div className="mb-2">
      <span className="text-gray-300 text-sm">Investment</span>
    </div>
    <div className="flex items-center justify-center gap-2">
      <button
        className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
        onClick={() => setInvestment(Math.max(1000, investment - 1000))}
      >
        <Minus size={14} className="text-gray-300" />
      </button>
      <div className="bg-gray-700 px-4 py-2 rounded font-mono text-center flex-1 text-white">
        {investment.toLocaleString()} ₹
      </div>
      <button
        className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
        onClick={() => setInvestment(investment + 1000)}
      >
        <Plus size={14} className="text-gray-300" />
      </button>
    </div>
  </div>

  {/* Switch Button */}
  <div className="px-4 mb-4">
    <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-sm font-medium transition-colors text-white">
      Switch
    </button>
  </div>

  {/* Up Button */}
  <div className="px-4 mb-1">
    <button className="w-full py-3 bg-green-500 hover:bg-green-600 rounded-t text-white font-medium transition-colors">
      <div className="flex items-center justify-center gap-2">
        <span>Up</span>
        <div className="w-0 h-0 border-l-3 border-r-3 border-b-4 border-transparent border-b-white"></div>
      </div>
    </button>
  </div>

  {/* Your Payout */}
  <div className="px-4 mb-1">
    <div className="bg-gray-700 py-2 px-4 text-center">
      <div className="text-xs text-gray-300 mb-1">Your payout:</div>
      <div className="text-lg font-bold text-white">{(investment * 1.65).toLocaleString()} ₹</div>
    </div>
  </div>

  {/* Down Button */}
  <div className="px-4 mb-6">
    <button className="w-full py-3 bg-red-500 hover:bg-red-600 rounded-b text-white font-medium transition-colors">
      <div className="flex items-center justify-center gap-2">
        <span>Down</span>
        <div className="w-0 h-0 border-l-3 border-r-3 border-t-4 border-transparent border-t-white"></div>
      </div>
    </button>
  </div>

  {/* Trades Section */}
  <div className="flex-1 px-4 pb-4 bg-slate-800">
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm font-medium">Trades</span>
      <div className="flex items-center gap-2">
        <span className="bg-blue-600 text-xs px-2 py-1 rounded text-white font-medium">0</span>
        <div className="flex gap-1">
          <button className="w-5 h-5 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center transition-colors">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </button>
          <button className="w-5 h-5 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center transition-colors">
            <div className="w-2 h-2 border border-white rounded-full"></div>
          </button>
        </div>
      </div>
    </div>

    {/* Trade Container */}
    <div className="bg-gray-700 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-center text-gray-400">
        <div className="text-center">
          <ShoppingCart size={32} className="mx-auto mb-3 text-gray-500" />
          <div className="text-sm leading-relaxed">
            You don't have a trade
            <br />
            history yet. You can open a
            <br />
            trade using the form above.
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default TradingSidebar;
