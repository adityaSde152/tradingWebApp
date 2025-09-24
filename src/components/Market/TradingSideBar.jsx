import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Plus,
  Minus,
  ShoppingCart,
  RefreshCw,
  Timer,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  Wallet,
  Activity,
  Target,
  Zap,
} from "lucide-react";
import { useTrade } from "../../context/TradeContext";
import { useNavigate } from "react-router-dom";

const SYMBOL_META = {
  BTCUSDT: { name: "Bitcoin", icon: "BTC", color: "from-orange-400 to-orange-600" },
  ETHUSDT: { name: "Ethereum", icon: "ETH", color: "from-blue-400 to-blue-600" },
  BNBUSDT: { name: "BNB", icon: "BNB", color: "from-yellow-400 to-yellow-600" },
  ADAUSDT: { name: "Cardano", icon: "ADA", color: "from-blue-300 to-blue-500" },
  XRPUSDT: { name: "Ripple", icon: "XRP", color: "from-indigo-400 to-indigo-600" },
  SOLUSDT: { name: "Solana", icon: "SOL", color: "from-purple-400 to-purple-600" },
  DOGEUSDT: { name: "Dogecoin", icon: "DOGE", color: "from-yellow-300 to-yellow-500" },
  DOTUSDT: { name: "Polkadot", icon: "DOT", color: "from-pink-400 to-pink-600" },
  MATICUSDT: { name: "Polygon", icon: "MATIC", color: "from-purple-300 to-purple-500" },
  LTCUSDT: { name: "Litecoin", icon: "LTC", color: "from-gray-300 to-gray-500" },
};

const TradingSidebar = ({ symbol, onSwitch, onTradeHover }) => {
  const [timeMinutes, setTimeMinutes] = useState(1);
  const [timeSeconds, setTimeSeconds] = useState(0);
  const [investment, setInvestment] = useState(10000);
  const [price, setPrice] = useState(null);

  const { trades, startTrade } = useTrade();
  const [tick, setTick] = useState(0);
  const navigate = useNavigate();

  // ✅ Calculate payout
  const payoutPercentage = 85;
  const potentialPayout = Math.round((investment * payoutPercentage) / 100);
  const totalReturn = investment + potentialPayout;

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
    icon: symbol?.slice(0, 3) || "?",
    color: "from-gray-400 to-gray-600",
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
    <div className="
      bg-gradient-to-b from-slate-900 to-slate-950 
      border-l border-slate-700/50 backdrop-blur-sm
      text-white shadow-xl flex flex-col
      
      /* Mobile: Fixed bottom with rounded corners */
      w-full h-[65vh] fixed bottom-0 left-0 right-0 z-20
      rounded-t-2xl border-t border-slate-600
      
      /* Desktop: Compact side panel */
      md:static md:w-64 md:h-full md:rounded-none md:border-t-0
      
      /* Large screens */
      lg:w-60 xl:w-64
    ">
      {/* Header with Quick Actions - ✅ Reduced padding */}
      <div className="p-3 border-b border-slate-700/30 flex-shrink-0">
        <div className="flex gap-2 mb-2">
          <button className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 py-1.5 px-2 rounded-lg text-xs font-bold transition-all duration-200 shadow-md hover:shadow-lg">
            <DollarSign className="w-3 h-3 inline mr-1" />
            Fund
          </button>
          <button className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 py-1.5 px-2 rounded-lg text-xs font-bold transition-all duration-200 shadow-md hover:shadow-lg">
            <Wallet className="w-3 h-3 inline mr-1" />
            Withdraw
          </button>
        </div>
        
        {/* Asset Info Card - ✅ Reduced padding */}
        <div className="bg-slate-800/50 rounded-xl p-2.5 border border-slate-600/30">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 bg-gradient-to-br ${meta.color} rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
                {meta.icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold">{meta.name}</h3>
                <p className="text-xs text-slate-400">Spot Trading</p>
              </div>
            </div>
            <button
              onClick={onSwitch}
              className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <RefreshCw size={12} className="text-slate-400" />
            </button>
          </div>
          
          {/* Live Price Display - ✅ Reduced padding */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Activity className="w-3 h-3 text-emerald-400" />
              <span className="text-xs text-slate-400 uppercase tracking-wide">Live Price</span>
            </div>
            <div className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              ${price || "---"}
            </div>
          </div>
        </div>
      </div>

      {/* Trading Controls - ✅ Reduced spacing and padding */}
      <div className="px-3 py-2 space-y-3 flex-shrink-0">
        {/* Time Control */}
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Timer className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Duration</span>
          </div>
          <div className="flex items-center justify-between bg-slate-800/60 rounded-lg p-1.5 border border-slate-600/30">
            <button
              onClick={decreaseTime}
              className="w-7 h-7 bg-slate-700 hover:bg-slate-600 rounded-md flex items-center justify-center transition-colors"
            >
              <Minus size={12} className="text-slate-300" />
            </button>
            <div className="bg-slate-900/70 px-3 py-1.5 rounded-md border border-slate-600/50">
              <div className="text-sm font-mono text-center text-white">{formatTime()}</div>
            </div>
            <button
              onClick={increaseTime}
              className="w-7 h-7 bg-slate-700 hover:bg-slate-600 rounded-md flex items-center justify-center transition-colors"
            >
              <Plus size={12} className="text-slate-300" />
            </button>
          </div>
        </div>

        {/* Investment Control */}
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <DollarSign className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Amount</span>
          </div>
          <div className="flex items-center justify-between bg-slate-800/60 rounded-lg p-1.5 border border-slate-600/30">
            <button
              onClick={() => setInvestment(Math.max(1000, investment - 1000))}
              className="w-7 h-7 bg-slate-700 hover:bg-slate-600 rounded-md flex items-center justify-center transition-colors"
            >
              <Minus size={12} className="text-slate-300" />
            </button>
            <div className="bg-slate-900/70 px-3 py-1.5 rounded-md border border-slate-600/50">
              <div className="text-sm font-mono text-center text-white">₹{investment.toLocaleString()}</div>
            </div>
            <button
              onClick={() => setInvestment(investment + 1000)}
              className="w-7 h-7 bg-slate-700 hover:bg-slate-600 rounded-md flex items-center justify-center transition-colors"
            >
              <Plus size={12} className="text-slate-300" />
            </button>
          </div>
        </div>
      </div>

      {/* ✅ COMPACT PAYOUT DISPLAY SECTION */}
      <div className="px-3 pb-2 flex-shrink-0">
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-lg p-2.5 border border-slate-600/40 backdrop-blur-sm">
          {/* Compact Header */}
          <div className="flex items-center justify-center gap-1.5 mb-2">
            <Target className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Payout</span>
          </div>
          
          {/* Compact Stats */}
          <div className="flex items-center justify-between text-center">
            <div className="flex-1">
              <div className="text-xs text-slate-400">Profit</div>
              <div className="text-sm font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                +₹{potentialPayout.toLocaleString()}
              </div>
            </div>
            <div className="px-2">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-slate-400">Return</div>
              <div className="text-sm font-bold text-white">₹{totalReturn.toLocaleString()}</div>
            </div>
          </div>
          
          {/* Compact Risk */}
          <div className="text-center mt-1.5">
            <div className="text-xs text-slate-500">
              <span className="text-green-400">{payoutPercentage}%</span> • <span className="text-red-400">Risk applies</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trade Buttons - ✅ Reduced padding */}
      <div className="px-3 pb-3 space-y-1.5 flex-shrink-0">
        <button
          onClick={() => handleTrade("UP")}
          onMouseEnter={() => onTradeHover && onTradeHover('UP')}
          onMouseLeave={() => onTradeHover && onTradeHover(null)}
          className="w-full bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 hover:from-green-600 hover:via-green-700 hover:to-emerald-700 py-2.5 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
        >
          <div className="flex items-center justify-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span>UP</span>
            <span className="text-green-200 text-sm">+₹{potentialPayout.toLocaleString()}</span>
          </div>
        </button>
        <button
          onClick={() => handleTrade("DOWN")}
          onMouseEnter={() => onTradeHover && onTradeHover('DOWN')}
          onMouseLeave={() => onTradeHover && onTradeHover(null)}
          className="w-full bg-gradient-to-r from-red-500 via-red-600 to-rose-600 hover:from-red-600 hover:via-red-700 hover:to-rose-700 py-2.5 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
        >
          <div className="flex items-center justify-center gap-2">
            <TrendingDown className="w-4 h-4" />
            <span>DOWN</span>
            <span className="text-red-200 text-sm">+₹{potentialPayout.toLocaleString()}</span>
          </div>
        </button>
      </div>

      {/* Trade History - ✅ Reduced padding and takes remaining space */}
      <div className="flex-1 px-3 pb-3 min-h-0 overflow-hidden">
        <div className="bg-slate-800/30 rounded-xl h-full flex flex-col border border-slate-600/30">
          <div className="flex items-center justify-between p-2.5 border-b border-slate-600/30 flex-shrink-0">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-sm font-semibold">Recent Trades</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-blue-500 text-xs px-2 py-0.5 rounded-full font-bold">
                {trades.length}
              </div>
              <button
                onClick={() => navigate("/dashboard/trade")}
                className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                View All →
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2.5">
            {trades.length === 0 ? (
              <div className="text-center text-slate-400 py-6">
                <ShoppingCart size={28} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No trades yet</p>
                <p className="text-xs text-slate-500 mt-1">Start your first trade above</p>
              </div>
            ) : (
              <div className="space-y-1.5">
                {trades.slice(0, 4).map((trade, index) => {
                  const latestPrice = window.latestCandleClose || trade.price;
                  const candleColor = window.latestCandleColor || "green";

                  return (
                    <div
                      key={trade.id}
                      className="bg-slate-800/50 border border-slate-600/40 rounded-lg p-2.5 hover:bg-slate-700/50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${trade.direction === "UP" ? "bg-green-400" : "bg-red-400"}`} />
                          <span className="text-sm font-medium">{trade.symbol}</span>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          trade.remaining > 0 
                            ? "bg-blue-500/20 text-blue-300" 
                            : trade.status === "Won" 
                              ? "bg-green-500/20 text-green-300"
                              : "bg-red-500/20 text-red-300"
                        }`}>
                          {trade.remaining > 0 ? `${trade.remaining}s` : trade.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-400">
                          {trade.direction} • ₹{trade.investment.toLocaleString()}
                        </span>
                        <span className={`text-sm font-bold ${
                          trade.remaining > 0
                            ? candleColor === "green" 
                              ? "text-green-400" 
                              : "text-red-400"
                            : trade.status === "Won"
                              ? "text-green-400"
                              : "text-red-400"
                        }`}>
                          ₹{trade.payout.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingSidebar;
