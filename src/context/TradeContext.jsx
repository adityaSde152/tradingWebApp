import React, { createContext, useContext, useState, useEffect, useRef } from "react";

const TradeContext = createContext();
export const useTrade = () => useContext(TradeContext);

export const TradeProvider = ({ children }) => {
  const [trades, setTrades] = useState([]); // all trades
  const timersRef = useRef({}); // keep countdown intervals

  // Start a new trade
  const startTrade = ({ symbol, direction, investment, duration, price }) => {
    const id = Date.now();
    const endTime = Date.now() + duration * 1000;

    const trade = {
      id,
      symbol,
      direction, // "UP" or "DOWN"
      investment,
      payout: investment * 1.65,
      entryPrice: price,
      endTime,
      remaining: duration, // countdown in seconds
      status: "ACTIVE", // ACTIVE | WON | LOST
    };

    setTrades((prev) => [trade, ...prev]);

    // countdown logic
    timersRef.current[id] = setInterval(() => {
      setTrades((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, remaining: Math.max(0, t.remaining - 1) } : t
        )
      );
    }, 1000);
  };

  // Check when trades expire
  useEffect(() => {
    const checker = setInterval(() => {
      setTrades((prev) =>
        prev.map((t) => {
          if (t.status === "ACTIVE" && Date.now() >= t.endTime) {
            clearInterval(timersRef.current[t.id]);

            // Evaluate result (dummy check: last candle vs entryPrice)
            const lastPrice = window.latestPrice?.[t.symbol] || t.entryPrice;

            let status = "LOST";
            if (t.direction === "UP" && lastPrice > t.entryPrice) status = "WON";
            if (t.direction === "DOWN" && lastPrice < t.entryPrice) status = "WON";

            return { ...t, status, remaining: 0 };
          }
          return t;
        })
      );
    }, 1000);

    return () => clearInterval(checker);
  }, []);

  const value = { trades, startTrade };
  return <TradeContext.Provider value={value}>{children}</TradeContext.Provider>;
};
