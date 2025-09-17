import React, { useState } from "react";

const INTERVALS = [
  "1m", "3m", "5m", "15m", "30m",
  "1h", "2h", "4h", "6h", "8h", "12h",
  "1d", "3d", "1w", "1M"
];


const IntervalSelector = ({ interval, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute top-12 left-2 z-20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black bg-opacity-50 px-3 py-1 rounded text-sm text-white hover:bg-opacity-80"
      >
        Interval: {interval}
      </button>

      {isOpen && (
        <div className="mt-2 bg-gray-800 rounded shadow-lg">
          {INTERVALS.map((int) => (
            <button
              key={int}
              onClick={() => {
                onChange(int);
                setIsOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-700 ${
                interval === int ? "bg-gray-700 text-green-400" : "text-white"
              }`}
            >
              {int}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default IntervalSelector;
