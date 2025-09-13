import React, { useState } from "react";
import { Plus } from "lucide-react";

const symbols = [
  { label: "Bitcoin (BTC)", value: "BTCUSDT" },
  { label: "Ethereum (ETH)", value: "ETHUSDT" },
  { label: "BNB", value: "BNBUSDT" },
  { label: "Solana (SOL)", value: "SOLUSDT" },
];

const SymbolSelector = ({ onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute top-4 left-4 z-20">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full shadow-md transition-colors"
      >
        <Plus className="text-white" size={20} />
      </button>

      {open && (
        <div className="mt-2 bg-black bg-opacity-70 backdrop-blur-md text-white rounded-lg shadow-lg">
          {symbols.map((s) => (
            <button
              key={s.value}
              onClick={() => {
                onChange(s.value);
                setOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-700"
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SymbolSelector;
