import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Accordion from './Accordion';
import './Accordion.css';

function CoinInfo() {               //CoinInfo component
    const [coins, setCoins] = useState([]);             //initialize coins state
    const [openAccordion, setOpenAccordion] = useState(null);           //initialize openAccordion state

    const fetchTopCoins = async () => {                 //fetch top 10 coins by market cap
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                params: {
                    vs_currency: 'usd',
                    order: 'market_cap_desc',
                    per_page: 10,
                    page: 1,
                    sparkline: false
                }
            });
            setCoins(response.data);                //set coins state with response data
        } catch (error) {
            console.error('Error fetching coins:', error);
        }
    };

    useEffect(() => {                       //useEffect hook to fetch top coins, this will run only once and its purpose is to fetch top coins
        fetchTopCoins();            //fetch top coins function, the hook will run this only once when the page loads
    }, []);

    const toggleAccordion = (id) => {               //toggle accordion function
        setOpenAccordion(openAccordion === id ? null : id);      //toggle accordion based on id
    };

    return (
        <div className="section-container">
            <div className="container">
            <h1 className="section-title text-center" style={{ fontSize: '2rem' }}>Top 10 Coins by Market Cap</h1>
            <p className="section-title text-center">Weekly Based</p>
                {coins.map(coin => (
                    <Accordion
                        key={coin.id}
                        id={coin.id}
                        isOpen={openAccordion === coin.id}
                        title={coin.name}
                        description={`Current price: $${coin.current_price}. Market cap: $${coin.market_cap}.`}
                        toggle={() => toggleAccordion(coin.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default CoinInfo;
