import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";


function WalletNavlink() {
    const navigate = useNavigate();
      const location = useLocation(); // Get current path
    
      
    
      // Navigation items with routes
      const navItems = [
        { name: "Deposit", route: "/dashboard/deposit" },
        { name: "Withdrawal", route: "/dashboard/withdrawal" },
        { name: "Transactions", route: "/dashboard/transactions" },
        { name: "Trades", route: "/dashboard/trades" },
        { name: "Account", route: "/dashboard/account" },
        { name: "Market", route: "/dashboard/market" },
        { name: "Tournaments", route: "/dashboard/tournaments" },
        { name: "Analytics", route: "/dashboard/analytics" },
      ];
  return (
 <div className="flex items-center justify-between mb-6">
  {/* Navigation Buttons */}
  <div className="flex space-x-4">
    {navItems.map((item) => {
      const isActive = location.pathname === item.route;
      return (
        <button
          key={item.name}
          className={`px-4 py-2 rounded hover:bg-gray-700 ${
            isActive ? "bg-gray-600 font-bold" : "bg-gray-800"
          }`}
          onClick={() => navigate(item.route)}
        >
          {item.name}
        </button>
      );
    })}
  </div>

  {/* Balance Section */}
  <div className="flex space-x-10 text-sm">
    <div>
      <p className="text-gray-400">Available for withdrawal</p>
      <p className="font-bold">0.00 $</p>
    </div>
    <div>
      <p className="text-gray-400">In the account</p>
      <p className="font-bold">0.00 $</p>
    </div>
  </div>
</div>

  )
}

export default WalletNavlink