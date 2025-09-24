import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import cryptoLogos from "../../assets/cryptoLogos";
import api from "../../api/axiosClient";

export default function CryptoWithdrawal({ userId, token, userBalance }) {
  const { crypto } = useParams();
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [txStatus, setTxStatus] = useState(null);
  const [copied, setCopied] = useState(false);

  const predefinedAmounts = [50, 100, 200];

  useEffect(() => {
    const found = cryptoLogos.find((c) => c.route === `/${crypto}`);
    setSelectedCrypto(found || cryptoLogos[0]);
  }, [crypto]);

  useEffect(() => {
    if (!userId) return;
    const socket = io("http://localhost:4000", { auth: { token } });

    socket.on("connect", () => {
      socket.emit("join", userId);
    });

    socket.on("transactionUpdate", (tx) => {
      if (tx.type === "withdraw" && tx.crypto === selectedCrypto?.symbol) {
        setTxStatus(tx.status);
      }
    });

    return () => socket.disconnect();
  }, [userId, token, selectedCrypto]);

  const handleWithdraw = async () => {
    if (!recipient || !amount) return;
    setLoading(true);
    setTxStatus(null);

    try {
      await api.post("/api/payment/withdraw", {
        asset: selectedCrypto.symbol,
        recipient,
        amount: parseFloat(amount),
      });
      setTxStatus("PENDING");
    } catch (error) {
      console.error("Withdrawal error:", error.response?.data || error.message);
      setTxStatus("FAILED");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(recipient);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!selectedCrypto) return <div className="text-white text-center">Loading...</div>;

  const logoPath = `/crypto-icons/${selectedCrypto.file}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="backdrop-blur-lg bg-white/10 rounded-xl w-full max-w-3xl space-y-6 text-white shadow-lg border border-white/20"
      style={{
          backgroundImage: `url(${logoPath})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="p-8 space-y-6">
          <h3 className="text-2xl font-bold">Withdraw {selectedCrypto.name}</h3>

          {/* Crypto Info Card */}
          <div className="bg-gray-800/70 rounded-xl p-6 flex items-center space-x-6">
            <img src={logoPath} alt={selectedCrypto.name} className="w-16 h-16 object-contain" />
            <div>
              <h2 className="text-2xl font-semibold">{selectedCrypto.name}</h2>
              <p className="text-gray-300">
                Available Balance: {userBalance?.[selectedCrypto.symbol] || 0}
              </p>
            </div>
          </div>

          {/* Withdrawal Form */}
          <div className="bg-gray-800/70 rounded-xl p-6 space-y-4">
            {/* Recipient Address */}
            <h4 className="font-semibold">Recipient Address</h4>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Enter recipient address"
                className="flex-1 p-3 rounded bg-gray-700 text-white placeholder-gray-400"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
              <button
                onClick={handleCopy}
                className="px-3 py-2 bg-blue-600 rounded hover:bg-blue-500 transition"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            {/* Amount */}
            <h4 className="font-semibold">Amount</h4>
            <div className="flex space-x-2 mb-2">
              {predefinedAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt)}
                  className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 transition"
                >
                  {amt} $
                </button>
              ))}
            </div>
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full p-3 rounded bg-gray-700 text-white"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            {/* Submit Button */}
            <button
              onClick={handleWithdraw}
              disabled={loading || !recipient || !amount}
              className="w-full mt-3 p-3 bg-green-600 rounded hover:bg-green-500 font-semibold transition"
            >
              {loading ? "Processing..." : "Withdraw"}
            </button>

            {/* Transaction Status */}
            {txStatus && (
              <p
                className={`mt-4 font-semibold text-lg ${
                  txStatus === "COMPLETED"
                    ? "text-green-400"
                    : txStatus === "PENDING"
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {txStatus === "COMPLETED"
                  ? "Withdrawal Completed ✅"
                  : txStatus === "PENDING"
                  ? "Withdrawal Pending ⏳"
                  : "Withdrawal Failed ❌"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
