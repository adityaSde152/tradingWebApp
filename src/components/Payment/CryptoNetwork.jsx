import React from 'react';
import cryptoLogos from '../../assets/cryptoLogos';
import { useNavigate } from 'react-router-dom';

function CryptoNetwork({ type = 'deposit' }) { // type = 'deposit' or 'withdraw'
  const navigate = useNavigate();

  const handleCryptoClick = (route) => {
    navigate(`/dashboard/${type}${route}`); // dynamic route based on type
  };

  return (
    <div>
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
  );
}

export default CryptoNetwork;
