import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import { io } from "socket.io-client";
import cryptoLogos from "../../assets/cryptoLogos";
import api from "../../api/axiosClient";
import WalletNavlink from "../../components/Dashboard/WalletNavlink";

export default function CryptoDeposit({ userId, token }) {
  const { crypto } = useParams();
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [amount, setAmount] = useState("");
  const [depositAddress, setDepositAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [txStatus, setTxStatus] = useState(null); // NEW: track transaction status

  const predefinedAmounts = [100, 150, 200];

  useEffect(() => {
    const found = cryptoLogos.find((c) => c.route === `/${crypto}`);
    setSelectedCrypto(found || cryptoLogos[0]);
  }, [crypto]);

  // --- WebSocket connection ---
  useEffect(() => {
    if (!userId) return;

    const socket = io("http://localhost:4000", {
      auth: { token }, // optional if your socket is JWT-protected
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      socket.emit("join", userId); // join user room
    });

    socket.on("transactionUpdate", (tx) => {
      console.log("Transaction update received:", tx);
      if (tx.type === "deposit") {
        setTxStatus(tx.status); // update inline status
      }
    });

    socket.on("balanceUpdate", (data) => {
      console.log("Balance update:", data);
      // Optionally, update local balance state
    });

    return () => socket.disconnect();
  }, [userId, token]);

  const handleDeposit = async () => {
    if (!selectedCrypto) return;
    setLoading(true);
    setCopied(false);
    setTxStatus(null); // reset status on new deposit

    try {
      const res = await api.post(
        "/api/payment/deposit-address",
        { asset: selectedCrypto.symbol }
      );
      setDepositAddress(res.data.depositAddress);
    } catch (error) {
      console.error("Error generating deposit address:", error.response?.data || error.message);
      alert("Failed to generate deposit address.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(depositAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!selectedCrypto) {
    return <div className="text-white text-center">Loading crypto info...</div>;
  }

  const logoPath = `/crypto-icons/${selectedCrypto.file}`;

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      
      <div
        className="backdrop-blur-lg bg-white/10 rounded-xl w-full max-w-3xl space-y-6 text-white shadow-lg border border-white/20"
        style={{
          backgroundImage: `url(${logoPath})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white/10 rounded-xl p-8 w-full max-w-3xl space-y-6 text-white shadow-lg border border-white/20">
          <h3 className="text-xl font-semibold mb-3">Deposit {selectedCrypto.name}</h3>

          <div className="bg-gray-800/70 rounded-xl p-6 flex items-center space-x-6">
            <img src={logoPath} alt={selectedCrypto.name} className="w-16 h-16 object-contain" />
            <div>
              <h2 className="text-2xl font-bold">{selectedCrypto.name}</h2>
              <p className="text-gray-300">Min: {selectedCrypto.min}</p>
              <p className="text-gray-300">Max: {selectedCrypto.max}</p>
            </div>
          </div>

          {/* Deposit Address + QR */}
          {depositAddress && (
            <div className="bg-gray-800/70 p-6 rounded-xl space-y-4 text-center">
              <h3 className="text-lg font-semibold">Your Deposit Address:</h3>
              <p className="break-all text-xl font-bold text-gray-200">{depositAddress}</p>

              <div className="flex justify-center">
                <QRCode value={depositAddress} size={180} bgColor="#111827" fgColor="#22c55e" />
              </div>

              <p className="mt-3 text-white">
                Deposit <span className="font-bold">${amount}.00</span> via{" "}
                <span className="font-bold">{selectedCrypto.name}</span>
              </p>

              <button
                onClick={handleCopy}
                className="px-4 py-2 mt-3 bg-blue-600 rounded hover:bg-blue-500 font-medium transition"
              >
                {copied ? "Copied!" : "Copy Address"}
              </button>

              {/* NEW: Transaction Status */}
              {txStatus && (
                <p
                  className={`mt-4 font-semibold text-lg ${
                    txStatus === "COMPLETED" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {txStatus === "COMPLETED" ? "Deposit Completed ✅" : "Deposit Failed ❌"}
                </p>
              )}
            </div>
          )}

          {/* Payment Data */}
          {!depositAddress && (
            <div className="bg-gray-800/70 p-6 rounded-xl space-y-4">
              <h3 className="text-xl font-semibold">Enter Amount</h3>
              <div className="flex space-x-2 mb-2">
                {predefinedAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setAmount(amt)}
                    className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 transition"
                  >
                    {amt}$
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
              <button
                onClick={handleDeposit}
                disabled={loading || !amount}
                className="w-full mt-3 p-3 bg-green-600 rounded hover:bg-green-500 font-semibold transition "
              >
                {loading ? "Generating Address..." : "Generate Deposit Address"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
