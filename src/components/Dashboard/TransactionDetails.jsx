import React, { useState } from "react";

const TransactionDetails = () => {
  // Dummy transaction data
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: "2025-09-01",
      type: "Buy",
      asset: "Bitcoin",
      amount: "0.05 BTC",
      price: "$2500",
      status: "Completed",
    },
    {
      id: 2,
      date: "2025-09-02",
      type: "Sell",
      asset: "Ethereum",
      amount: "1.2 ETH",
      price: "$2200",
      status: "Pending",
    },
    {
      id: 3,
      date: "2025-09-04",
      type: "Deposit",
      asset: "USDT",
      amount: "500 USDT",
      price: "$500",
      status: "Completed",
    },
    {
      id: 4,
      date: "2025-09-05",
      type: "Withdraw",
      asset: "Bitcoin",
      amount: "0.01 BTC",
      price: "$500",
      status: "Failed",
    },
    {
      id: 5,
      date: "2025-09-06",
      type: "Buy",
      asset: "Ethereum",
      amount: "0.5 ETH",
      price: "$900",
      status: "Completed",
    },
    {
      id: 6,
      date: "2025-09-07",
      type: "Sell",
      asset: "Bitcoin",
      amount: "0.02 BTC",
      price: "$1000",
      status: "Pending",
    },
  ]);
  const [filter, setFilter] = useState("All");

  // Filter transactions by type
  const filteredTransactions =
    filter === "All"
      ? transactions
      : transactions.filter((t) => t.type === filter);

  return (
    <div className="p-6 bg-gray-800 text-white rounded-xl shadow-md w-full">
      <h2 className="text-xl font-bold mb-4 text-green">Transaction History</h2>

      {/* Filter Options */}
      <div className="flex gap-3 mb-4 flex-wrap">
        {["All", "Buy", "Sell", "Deposit", "Withdraw"].map((option) => (
          <button
            key={option}
            onClick={() => setFilter(option)}
            className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer ${
              filter === option
                ? "bg-green/80 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Transaction Table */}
      <div className="overflow-x-auto scrollbar-hide max-h-100">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-700 text-left text-sm font-semibold">
              <th className="p-3">Date</th>
              <th className="p-3">Type</th>
              <th className="p-3">Asset</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx) => (
              <tr key={tx.id} className="border-b text-xs md:text-sm">
                <td className="p-3">{tx.date}</td>
                <td
                  className={`p-3 font-medium ${
                    tx.type === "Buy"
                      ? "text-green"
                      : tx.type === "Sell"
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                >
                  {tx.type}
                </td>
                <td className="p-3">{tx.asset}</td>
                <td className="p-3">{tx.amount}</td>
                <td className="p-3">{tx.price}</td>
                <td
                  className={`p-3 ${
                    tx.status === "Completed"
                      ? "text-green"
                      : tx.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-500"
                  }`}
                >
                  {tx.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionDetails;
