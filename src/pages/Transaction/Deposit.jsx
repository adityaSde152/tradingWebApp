import React from "react";
import { useNavigate } from "react-router-dom";
import cryptoLogos from "../../assets/cryptoLogos";
import WalletNavlink from "../../components/Dashboard/WalletNavlink";

export default function Deposit() {
  const navigate = useNavigate();

  const handleCryptoClick = (route) => {
    navigate(`/dashboard/deposit${route}`);
  };

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
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            {cryptoLogos.map((crypto) => (
              <div
                key={crypto.symbol}
                className="flex items-center p-4 bg-gray-800 rounded hover:bg-gray-700 hover:scale-102 duration-300 cursor-pointer"
                onClick={() => handleCryptoClick(crypto.route)}
              >
                <img
                  src={`/crypto-icons/${crypto.file}`} // ✅ load from public folder
                  alt={crypto.name}
                  className="w-10 h-10 object-contain mr-4"
                />
                <div>
                  <span className="font-semibold">{crypto.name}</span>
                 
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
