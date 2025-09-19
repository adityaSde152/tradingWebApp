import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Plus,
  Minus,
  ShoppingCart,
  RefreshCw,
} from "lucide-react";
import { useTrade } from "../../context/TradeContext";
import { useNavigate } from "react-router-dom";

const SYMBOL_META = {
  BTCUSDT: { name: "Bitcoin", icon: "₿", color: "bg-orange-500" },
  ETHUSDT: { name: "Ethereum", icon: "Ξ", color: "bg-indigo-500" },
  BNBUSDT: { name: "BNB", icon: "Ⓑ", color: "bg-yellow-400 text-black" },
  ADAUSDT: { name: "Cardano", icon: "A", color: "bg-blue-500" },
  XRPUSDT: { name: "Ripple", icon: "✕", color: "bg-sky-400" },
  SOLUSDT: { name: "Solana", icon: "◎", color: "bg-purple-500" },
  DOGEUSDT: { name: "Dogecoin", icon: "Ð", color: "bg-yellow-300 text-black" },
  DOTUSDT: { name: "Polkadot", icon: "●", color: "bg-pink-500" },
  MATICUSDT: { name: "Polygon", icon: "⬠", color: "bg-indigo-400" },
  LTCUSDT: { name: "Litecoin", icon: "Ł", color: "bg-gray-400 text-black" },
};

const TradingSidebar = ({ symbol, onSwitch }) => {
  const [timeMinutes, setTimeMinutes] = useState(1);
  const [timeSeconds, setTimeSeconds] = useState(0);
  const [investment, setInvestment] = useState(10000);
  const [price, setPrice] = useState(null);

  const { trades, startTrade } = useTrade();
  const [tick, setTick] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => setTick((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    const hours = Math.floor(timeMinutes / 60);
    const mins = timeMinutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${timeSeconds.toString().padStart(2, "0")}`;
  };

  const increaseTime = () => {
    if (timeSeconds < 59) setTimeSeconds(timeSeconds + 1);
    else {
      setTimeSeconds(0);
      setTimeMinutes(timeMinutes + 1);
    }
  };

  const decreaseTime = () => {
    if (timeSeconds > 0) setTimeSeconds(timeSeconds - 1);
    else if (timeMinutes > 0) {
      setTimeSeconds(59);
      setTimeMinutes(timeMinutes - 1);
    }
  };

  useEffect(() => {
    if (!symbol) return;

    const fetchPrice = async () => {
      try {
        const res = await fetch(
          `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
        );
        const data = await res.json();
        setPrice(parseFloat(data.price).toFixed(2));
        window.latestPrice = {
          ...window.latestPrice,
          [symbol]: parseFloat(data.price),
        };
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

  const handleTrade = (direction) => {
    startTrade({
      symbol,
      direction,
      investment,
      duration: timeMinutes * 60 + timeSeconds,
      price,
    });
  };

  return (
   <div
  className="
    bg-slate-950/80 backdrop-blur-xl text-white shadow-2xl
    flex flex-col border-slate-800
    w-full h-[60vh] fixed bottom-0 left-0 right-0 border-t z-20
    md:fixed md:top-0 md:right-0 md:w-64 md:h-screen md:border-l md:border-t-0
    lg:w-60
  "
>


      {/* Header */}
      <div className="flex p-4 gap-3">
        <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-3 py-2 rounded-xl text-sm font-semibold shadow-lg transition">
          + Deposit
        </button>
        <button className="flex-1 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 px-3 py-2 rounded-xl text-sm font-semibold shadow-lg transition">
          Withdraw
        </button>
      </div>

      {/* Symbol Info */}
      <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 ${meta.color} rounded-full flex items-center justify-center shadow-md`}
          >
            <span className="text-base font-bold">{meta.icon}</span>
          </div>
          <span className="font-medium tracking-wide">{meta.name} (OTC)</span>
        </div>
        <button
          onClick={onSwitch}
          className="text-slate-400 hover:text-white transition-colors"
        >
          <RefreshCw size={18} />
        </button>
      </div>

      {/* Live Price */}
      <div className="px-4 py-4 text-right">
        <div className="text-xs uppercase tracking-wide text-slate-400">
          Live Price
        </div>
        <div className="text-3xl font-extrabold font-mono text-emerald-400 drop-shadow">
          {price ? price : "—"}
        </div>
      </div>

      {/* Time Selector */}
<div className="px-4 py-3 border-t border-slate-800">
  <span className="text-gray-400 text-xs uppercase">Time</span>
  <div className="flex items-center justify-center gap-2 mt-2">
    <button
      onClick={decreaseTime}
      className="w-8 h-8 bg-slate-800/80 hover:bg-slate-700 rounded-full flex items-center justify-center shadow transition"
    >
      <Minus size={12} />
    </button>
    <div className="bg-slate-900/60 border border-slate-700 px-3 py-1 rounded-lg font-mono text-sm shadow-inner min-w-[70px] text-center">
      {formatTime()}
    </div>
    <button
      onClick={increaseTime}
      className="w-8 h-8 bg-slate-800/80 hover:bg-slate-700 rounded-full flex items-center justify-center shadow transition"
    >
      <Plus size={12} />
    </button>
  </div>
</div>

{/* Investment Selector */}
<div className="px-4 py-3 border-t border-slate-800">
  <span className="text-gray-400 text-xs uppercase">Investment</span>
  <div className="flex items-center justify-center gap-2 mt-2">
    <button
      onClick={() => setInvestment(Math.max(1000, investment - 1000))}
      className="w-8 h-8 bg-slate-800/80 hover:bg-slate-700 rounded-full flex items-center justify-center shadow transition"
    >
      <Minus size={12} />
    </button>
    <div className="bg-slate-900/60 border border-slate-700 px-3 py-1 rounded-lg font-mono text-sm shadow-inner min-w-[80px] text-center">
      {investment.toLocaleString()} ₹
    </div>
    <button
      onClick={() => setInvestment(investment + 1000)}
      className="w-8 h-8 bg-slate-800/80 hover:bg-slate-700 rounded-full flex items-center justify-center shadow transition"
    >
      <Plus size={12} />
    </button>
  </div>
</div>


      {/* Trade Buttons */}
      <div className="px-4 mt-4 space-y-3">
        <button
          onClick={() => handleTrade("UP")}
          className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl text-white font-semibold transition shadow-lg"
        >
          Buy Up ({(investment * 1.65).toLocaleString()} ₹)
        </button>
        <button
          onClick={() => handleTrade("DOWN")}
          className="w-full py-3 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 rounded-xl text-white font-semibold transition shadow-lg"
        >
          Buy Down ({(investment * 1.65).toLocaleString()} ₹)
        </button>
      </div>

      {/* Trades History */}
      <div className="flex-1 overflow-y-auto px-4 py-4 mt-4 border-t border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold tracking-wide">
            Trade History
          </span>
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-xs px-2 py-1 rounded-full shadow">
              {trades.length}
            </span>
            <button
              onClick={() => navigate("/dashboard/")}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-xs font-semibold transition shadow"
            >
              View All
            </button>
          </div>
        </div>

        {trades.length === 0 ? (
          <div className="text-center text-slate-400 py-10">
            <ShoppingCart size={28} className="mx-auto mb-2 opacity-60" />
            <div className="text-sm">No trades yet. Start trading above.</div>
          </div>
        ) : (
          <div className="space-y-3">
            {trades.map((trade) => {
              const latestPrice = window.latestCandleClose || trade.price;
              const candleColor = window.latestCandleColor || "green";

              return (
                <div
                  key={trade.id}
                  className="bg-slate-900/60 border border-slate-800 p-3 rounded-lg flex justify-between items-center shadow-md hover:shadow-lg transition"
                >
                  <div>
                    <div className="font-semibold">{trade.symbol}</div>
                    <div className="text-xs text-slate-400">
                      {trade.remaining > 0
                        ? `${trade.remaining}s left`
                        : `${trade.status}`}
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`font-bold ${
                        trade.remaining > 0
                          ? candleColor === "green"
                            ? "text-emerald-400"
                            : "text-red-400"
                          : ""
                      }`}
                    >
                      {trade.payout} ₹
                    </div>
                    <div
                      className={`text-xs font-medium ${
                        trade.direction === "UP"
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}
                    >
                      {trade.direction}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TradingSidebar;
