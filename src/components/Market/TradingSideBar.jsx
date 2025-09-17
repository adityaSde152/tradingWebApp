import React, { useState, useEffect } from "react";
import { ChevronDown, Plus, Minus, ShoppingCart, RefreshCw } from "lucide-react";

const SYMBOL_META = {
  BTCUSDT: { name: "Bitcoin", icon: "₿", color: "bg-orange-500" },
  ETHUSDT: { name: "Ethereum", icon: "Ξ", color: "bg-indigo-500" },
  BNBUSDT: { name: "BNB", icon: "Ⓑ", color: "bg-yellow-400 text-black" },
  SOLUSDT: { name: "Solana", icon: "◎", color: "bg-purple-500" },
};

const TradingSidebar = ({ symbol, onSwitch }) => {
  const [timeMinutes, setTimeMinutes] = useState(1);
  const [timeSeconds, setTimeSeconds] = useState(0);
  const [investment, setInvestment] = useState(10000);
  const [price, setPrice] = useState(null);
  const [trades, setTrades] = useState([]);

  // Format timer
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

  // Fetch live price
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
    const interval = setInterval(fetchPrice, 5000);
    return () => clearInterval(interval);
  }, [symbol]);

  const meta = SYMBOL_META[symbol] || {
    name: symbol,
    icon: "?",
    color: "bg-gray-500",
  };

  // Handle trade actions
  const handleTrade = (direction) => {
    const newTrade = {
      id: Date.now(),
      symbol,
      investment,
      direction,
      payout: (investment * 1.65).toFixed(2),
      time: formatTime(),
      price,
    };
    setTrades([newTrade, ...trades]);
  };

  return (
    <div className="w-80 bg-slate-900 text-white h-screen flex flex-col border-r border-slate-700 shadow-xl">
      {/* Header */}
      <div className="flex p-4 gap-2">
        <button className="flex-1 bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg text-sm font-medium shadow transition-colors">
          + Deposit
        </button>
        <button className="flex-1 bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg text-sm font-medium shadow transition-colors">
          Withdraw
        </button>
      </div>

      {/* Symbol Info */}
      <div className="px-4 py-3 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 ${meta.color} rounded-full flex items-center justify-center`}
          >
            <span className="text-sm font-bold">{meta.icon}</span>
          </div>
          <span className="font-medium">{meta.name} (OTC)</span>
        </div>
        <button
          onClick={onSwitch}
          className="text-slate-400 hover:text-white transition-colors"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Live Price */}
      <div className="px-4 py-3 text-right">
        <div className="text-sm text-slate-400">Live Price</div>
        <div className="text-2xl font-bold font-mono text-green-400">
          {price ? price : "—"}
        </div>
      </div>

      {/* Time Selector */}
      <div className="px-4 py-3 border-t border-slate-700">
        <span className="text-gray-400 text-sm">Time</span>
        <div className="flex items-center justify-center gap-2 mt-2">
          <button
            onClick={decreaseTime}
            className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition"
          >
            <Minus size={14} />
          </button>
          <div className="bg-slate-800 px-4 py-2 rounded font-mono text-lg">
            {formatTime()}
          </div>
          <button
            onClick={increaseTime}
            className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Investment Selector */}
      <div className="px-4 py-3 border-t border-slate-700">
        <span className="text-gray-400 text-sm">Investment</span>
        <div className="flex items-center justify-center gap-2 mt-2">
          <button
            onClick={() => setInvestment(Math.max(1000, investment - 1000))}
            className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition"
          >
            <Minus size={14} />
          </button>
          <div className="bg-slate-800 px-4 py-2 rounded font-mono text-lg">
            {investment.toLocaleString()} ₹
          </div>
          <button
            onClick={() => setInvestment(investment + 1000)}
            className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Trade Buttons */}
      <div className="px-4 mt-3 space-y-2">
        <button
          onClick={() => handleTrade("UP")}
          className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium transition shadow"
        >
          Buy Up ({(investment * 1.65).toLocaleString()} ₹)
        </button>
        <button
          onClick={() => handleTrade("DOWN")}
          className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition shadow"
        >
          Buy Down ({(investment * 1.65).toLocaleString()} ₹)
        </button>
      </div>

      {/* Trades History */}
      <div className="flex-1 overflow-y-auto px-4 py-4 mt-3 border-t border-slate-700">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">Trade History</span>
          <span className="bg-blue-600 text-xs px-2 py-1 rounded">
            {trades.length}
          </span>
        </div>

        {trades.length === 0 ? (
          <div className="text-center text-slate-400 py-10">
            <ShoppingCart size={28} className="mx-auto mb-2 opacity-60" />
            <div className="text-sm">No trades yet. Start trading above.</div>
          </div>
        ) : (
          <div className="space-y-3">
            {trades.map((trade) => (
              <div
                key={trade.id}
                className="bg-slate-800 p-3 rounded-lg flex justify-between items-center shadow"
              >
                <div>
                  <div className="font-medium">{trade.symbol}</div>
                  <div className="text-xs text-slate-400">
                    {trade.time} — {trade.direction}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">
                    {trade.payout} ₹
                  </div>
                  <div
                    className={`text-xs ${
                      trade.direction === "UP" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {trade.direction}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TradingSidebar;
