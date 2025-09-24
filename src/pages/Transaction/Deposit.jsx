import React from "react";
import { useNavigate } from "react-router-dom";
import WalletNavlink from "../../components/Dashboard/WalletNavlink";
import CryptoNetwork from "../../components/Payment/CryptoNetwork";

export default function Deposit() {
  const navigate = useNavigate();

  

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <WalletNavlink />

      {/* Info Message */}
      <div className="bg-blue-800 text-blue-100 p-3 rounded mb-6 text-sm">
        Some options may not be available at times, due to maintenance on the
        side of the financial providers, or other reasons. Please watch for
        updates, and consider using the other available variants.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* E-payments */}
        <div>
          <h2 className="text-lg font-semibold mb-4">E-payments</h2>
          <div className="space-y-4">{/* Add e-payment options here */}</div>
        </div>

        {/* Cryptocurrencies */}
        <div className="md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Cryptocurrencies</h2>
           <CryptoNetwork type="deposit"/>
        </div>
      </div>
    </div>
  );
}
