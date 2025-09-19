import React, { useState } from "react";

const symbols = [
  { label: "Bitcoin (BTC) / USDT", value: "BTCUSDT" },
  { label: "Ethereum (ETH) / USDT", value: "ETHUSDT" },
  { label: "BNB / USDT", value: "BNBUSDT" },
  { label: "Cardano (ADA) / USDT", value: "ADAUSDT" },
  { label: "Ripple (XRP) / USDT", value: "XRPUSDT" },
  { label: "Solana (SOL) / USDT", value: "SOLUSDT" },
  { label: "Dogecoin (DOGE) / USDT", value: "DOGEUSDT" },
  { label: "Polkadot (DOT) / USDT", value: "DOTUSDT" },
  { label: "Polygon (MATIC) / USDT", value: "MATICUSDT" },
  { label: "Litecoin (LTC) / USDT", value: "LTCUSDT" },
];

const SymbolSelector = ({ onChange }) => {
  const [open, setOpen] = useState(false);
  const [tabs, setTabs] = useState([symbols[0]]); // Start with BTC
  const [active, setActive] = useState(symbols[0]);

  const handleSelect = (s) => {
    // If already in tabs, just activate it
    const exists = tabs.find((t) => t.value === s.value);
    if (!exists) setTabs([...tabs, s]);
    setActive(s);
    onChange(s.value);
    setOpen(false);
  };

  const handleTabClick = (s) => {
    setActive(s);
    onChange(s.value);
  };

  const handleCloseTab = (s) => {
    const filtered = tabs.filter((t) => t.value !== s.value);
    setTabs(filtered);

    if (active.value === s.value) {
      const next = filtered.length > 0 ? filtered[filtered.length - 1] : symbols[0];
      setActive(next);
      onChange(next.value);
    }
  };

  return (
    <div className="absolute top-2 left-2 z-20 w-auto">
      {/* Tabs row */}
      <div className="flex space-x-2 mb-2">
        {tabs.map((s) => (
          <div
            key={s.value}
            className={`flex items-center px-3 py-1 rounded-md cursor-pointer ${
              active.value === s.value ? "bg-transparent text-white" : "bg-transparent text-gray-300"
            }`}
          >
            <span onClick={() => handleTabClick(s)}>{s.label.split(" ")[0]}</span>
            <button
              onClick={() => handleCloseTab(s)}
              className="ml-2 text-xs text-red-400 hover:text-red-600"
            >
              ✕
            </button>
          </div>
        ))}
        {/* Add button */}
        <button
          onClick={() => setOpen(!open)}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md text-white"
        >
          +
        </button>
      </div>

      {/* Dropdown list */}
      {open && (
        <div className="mt-1 bg-black bg-opacity-80 text-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {symbols.map((s) => (
            <button
              key={s.value}
              onClick={() => handleSelect(s)}
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
