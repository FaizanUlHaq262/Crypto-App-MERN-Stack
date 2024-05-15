import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Card.css';
import image from '../assets/bgSkull.png';

/*NAVIGATIONSSSSSSSSSS */
const Card = () => {
  const navigate = useNavigate();         //useNavigate hook to navigate to different routes

  const handleShowCryptos = () => {     //handleShowCryptos function to navigate to /coin route
    navigate('/coin');        //navigate to /coin route 
  };

  const handleBuyCrypto = () => {       //handleBuyCrypto function to navigate to /buy-crypto route
    navigate('/buy-crypto');
  };

  return (
    <div className="one-div">
      <div className="content">
        <img src={image} alt="Brand Logo" className="logo mx-auto mb-4" />
        <div className="buttons mt-4">
          <button onClick={handleShowCryptos} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
            Show Cryptos
          </button>
          <button onClick={handleBuyCrypto} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Buy Crypto
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
