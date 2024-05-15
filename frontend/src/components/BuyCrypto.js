import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BuyCrypto.css';

function BuyCrypto() {
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const fetchPrices = async () => {       //fetch prices of BTC, ETH, and DOGE
      try {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin&vs_currencies=usd`);
        setPrices({
          BTC: data.bitcoin.usd,
          ETH: data.ethereum.usd,
          DOGE: data.dogecoin.usd
        });
      } catch (error) {
        console.error("Failed to fetch prices:", error);
      }
    };
    fetchPrices();
  }, []);

  const handleBuy = () => {     ///handle buy button click
    if (!amount || !prices[selectedCrypto]) {     //check if amount and prices are available
      alert("Please enter an amount and ensure prices are loaded.");
      return;
    }
    const cost = amount * prices[selectedCrypto];       //calculate cost
    alert(`You have bought ${amount} ${selectedCrypto} for $${cost.toFixed(2)}`);       //show alert with purchase details
  };

  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <h1 className="minecraft-heading">Buy Crypto</h1> 
      <div className="card">
        <div className="card2">
          <div className="wrapper mb-2">
            {['BTC', 'ETH', 'DOGE'].map((crypto) => (
              <div className="option" key={crypto}>
                <input 
                  value={crypto} 
                  checked={selectedCrypto === crypto} 
                  onChange={(e) => setSelectedCrypto(e.target.value)} 
                  type="radio" 
                  className="input" 
                  id={crypto} 
                />
                
                <label htmlFor={crypto} className="btn">
                  <span className="span">{crypto}</span>
                </label>
                
              </div>
            ))}
            
          </div>
          <br/>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(Math.max(0, e.target.value))}      
            placeholder="Amount to buy"
            className="input-amount bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
          />
          <button onClick={handleBuy} className="special-buy-button">
            <span>B U Y</span>
          </button>
          {amount && (
            <div className="text-white mt-2">
              Current Rate: ${prices[selectedCrypto]?.toFixed(2)}<br/>
              Total Cost: ${(amount * prices[selectedCrypto]).toFixed(2)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BuyCrypto;