import React from "react";
import { useTrade } from "../context/TradeContext";

const Trade = () => {
  const { trades } = useTrade();

  return (
    <div className="p-6 text-white bg-slate-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Trade History</h1>

      {trades.length === 0 ? (
        <div className="text-center text-slate-400">
          No trades yet. Start trading from the market page.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-slate-700 bg-slate-800 rounded-lg">
            <thead className="bg-slate-700 text-slate-300 text-sm">
              <tr>
                <th className="px-4 py-2 text-left">Symbol</th>
                <th className="px-4 py-2 text-left">Direction</th>
                <th className="px-4 py-2 text-right">Investment</th>
                <th className="px-4 py-2 text-right">Payout</th>
                <th className="px-4 py-2 text-right">Entry Price</th>
                <th className="px-4 py-2 text-right">End Time</th>
                <th className="px-4 py-2 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {trades.map((trade) => (
                <tr key={trade.id} className="hover:bg-slate-700/50 transition">
                  <td className="px-4 py-2">{trade.symbol}</td>
                  <td
                    className={`px-4 py-2 font-medium ${
                      trade.direction === "UP"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {trade.direction}
                  </td>
                  <td className="px-4 py-2 text-right">
                    {trade.investment.toLocaleString()} ₹
                  </td>
                  <td className="px-4 py-2 text-right">
                    {trade.payout.toLocaleString()} ₹
                  </td>
                  <td className="px-4 py-2 text-right">{trade.entryPrice}</td>
                  <td className="px-4 py-2 text-right">
                    {new Date(trade.endTime).toLocaleTimeString()}
                  </td>
                  <td
                    className={`px-4 py-2 text-center font-bold ${
                      trade.status === "WON"
                        ? "text-green-400"
                        : trade.status === "LOST"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {trade.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Trade;
