import { useState, useEffect } from "react";

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

// === Quotex-style formula helpers ===
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const intervalToMinutes = (interval) => {
  if (interval.endsWith("m")) return parseInt(interval.slice(0, -1), 10);
  if (interval.endsWith("h")) return parseInt(interval.slice(0, -1), 10) * 60;
  if (interval.endsWith("d")) return parseInt(interval.slice(0, -1), 10) * 1440;
  if (interval.endsWith("w")) return parseInt(interval.slice(0, -1), 10) * 10080;
  return 1;
};

// default coefficients (tweak to tune)
const COEFFS = { A: 50, B: 6, C: 20, D: 1, minP: 60, maxP: 95 };

function computeFeatures(klines) {
  const returns = klines.map(
    (k) => ((parseFloat(k[4]) - parseFloat(k[1])) / parseFloat(k[1])) * 100
  );
  const n = returns.length;
  if (n < 2) return { vol_pct: 0.1, avgAbsReturn_pct: 0.05 };

  const mean = returns.reduce((a, b) => a + b, 0) / n;
  const avgAbsReturn_pct = returns.reduce((a, b) => a + Math.abs(b), 0) / n;
  const variance = returns.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (n - 1);
  const vol_pct = Math.sqrt(variance);
  return { vol_pct, avgAbsReturn_pct };
}

function predictPayout(klines, interval) {
  const { vol_pct, avgAbsReturn_pct } = computeFeatures(klines);
  const Tmin = intervalToMinutes(interval);
  const invVol = 1 / Math.max(1e-6, vol_pct);

  // Adjust 1m interval for realistic payouts
  const B = interval === "1m" ? 0.5 * COEFFS.B : COEFFS.B;
  const C = interval === "1m" ? 0.5 * COEFFS.C : COEFFS.C;

  const raw = COEFFS.A + B * invVol + C * avgAbsReturn_pct + COEFFS.D * (1 / Tmin);

  // Clamp payout: 1m -> 75-85%, others -> COEFFS.minP - COEFFS.maxP
  const minP = interval === "1m" ? 75 : COEFFS.minP;
  const maxP = interval === "1m" ? 85 : COEFFS.maxP;

  return clamp(Math.round(raw), minP, maxP); // <-- now returns value correctly
}

// =================== Component ===================
const SymbolSelector = ({ onChange, interval = "1m" }) => {
  const [open, setOpen] = useState(false);
  const [tabs, setTabs] = useState([symbols[0]]);
  const [active, setActive] = useState(symbols[0]);
  const [tabData, setTabData] = useState({});

  const fetchSymbolData = async (symbol) => {
    try {
      // 24h change & last price
      const res1 = await fetch(
        `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`
      );
      const data1 = await res1.json();

      // 1m candles
      const res1m = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1m&limit=30`
      );
      const klines1m = await res1m.json();
      const return1m = predictPayout(klines1m, "1m");

      // 5m candles
      const res5m = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=5m&limit=30`
      );
      const klines5m = await res5m.json();
      const return5m = predictPayout(klines5m, "5m");

      setTabData((prev) => ({
        ...prev,
        [symbol]: {
          price: parseFloat(data1.lastPrice),
          change24h: parseFloat(data1.priceChangePercent),
          return1m,
          return5m,
        },
      }));
    } catch (err) {
      console.warn("Failed to fetch symbol data:", err);
    }
  };

  useEffect(() => {
    tabs.forEach((t) => fetchSymbolData(t.value));
    const intervalId = setInterval(() => {
      tabs.forEach((t) => fetchSymbolData(t.value));
    }, 10000);
    return () => clearInterval(intervalId);
  }, [tabs]);

  const handleTabClick = (s) => {
    setActive(s);
    onChange(s.value);
  };

  const handleSelect = (s) => {
    if (!tabs.find((t) => t.value === s.value)) setTabs([...tabs, s]);
    setActive(s);
    onChange(s.value);
    setOpen(false);
    fetchSymbolData(s.value);
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
            className={`flex flex-col items-center px-3 py-1 rounded-md cursor-pointer ${
              active.value === s.value
                ? "bg-transparent text-white"
                : "bg-transparent text-gray-300"
            }`}
          >
            <span onClick={() => handleTabClick(s)} className="font-bold">
              {s.label.split(" ")[0]}
            </span>
            {tabData[s.value] && (
              <span className="text-xs text-gray-400">
                ${tabData[s.value].price} | {tabData[s.value].change24h}% |{" "}
                {tabData[s.value].return1m}% | {tabData[s.value].return5m}%
              </span>
            )}
            <button
              onClick={() => handleCloseTab(s)}
              className="text-xs text-red-400 hover:text-red-600 mt-1"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            setOpen(!open);
            symbols.forEach((s) => fetchSymbolData(s.value));
          }}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md text-white"
        >
          +
        </button>
      </div>

      {/* Dropdown table */}
      {open && (
        <div className="mt-1 bg-black bg-opacity-80 text-white rounded-lg shadow-lg max-h-80 overflow-y-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-3 py-2">Symbol</th>
                <th className="px-3 py-2">Price</th>
                <th className="px-3 py-2">24h %</th>
                <th className="px-3 py-2">1m %</th>
                <th className="px-3 py-2">5m %</th>
              </tr>
            </thead>
            <tbody>
              {symbols.map((s) => (
                <tr
                  key={s.value}
                  className={`cursor-pointer hover:bg-gray-700 ${
                    active.value === s.value ? "bg-gray-800" : ""
                  }`}
                  onClick={() => handleSelect(s)}
                >
                  <td className="px-3 py-2">{s.label.split(" ")[0]}</td>
                  <td className="px-3 py-2">{tabData[s.value]?.price ?? "-"}</td>
                  <td
                    className={`px-3 py-2 ${
                      (tabData[s.value]?.change24h ?? 0) >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {tabData[s.value]?.change24h ?? "-"}
                  </td>
                  <td className="px-3 py-2 text-green-400">
                    {tabData[s.value]?.return1m ?? "-"}
                  </td>
                  <td className="px-3 py-2 text-green-400">
                    {tabData[s.value]?.return5m ?? "-"}
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

export default SymbolSelector;
