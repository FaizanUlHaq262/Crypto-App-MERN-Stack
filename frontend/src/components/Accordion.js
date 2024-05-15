import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import HistoryChart from './HistoryChart';

const Accordion = ({ isOpen, id, title, toggle }) => {
    const [coinDetails, setCoinDetails] = useState(null);

    useEffect(() => {
        if (isOpen && !coinDetails && id) {
            axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
                .then(response => {
                    const { data } = response;          //destructure data from response
                    if (data.market_data && data.market_data.sparkline_7d && data.market_data.sparkline_7d.price) {         //check if data is available
                        setCoinDetails({
                            description: data.description.en.split('.')[0],             //split description by period and get first part
                            chartData: {
                                labels: data.market_data.sparkline_7d.price.map((_, index) => `Day ${index + 1}`),      ///map price data to labels
                                datasets: [{
                                    label: 'Price in USD Last 7 Days',
                                    data: data.market_data.sparkline_7d.price,
                                    borderColor: 'rgb(75, 192, 192)',
                                    fill: false,
                                    tension: 0.1
                                }]
                            }
                        });
                    } else {
                        setCoinDetails({
                            description: data.description.en.split('.')[0],             //split description by period and get first part
                            chartData: null
                        });
                    }
                })
                .catch(error => {
                    console.error('Error fetching coin details:', error);
                    setCoinDetails(null);
                });
        }
    }, [isOpen, id]);

    return (
        <div className={`accordion-item ${isOpen ? 'open' : ''}`} onClick={(e) => {             //add click event listener and toggle accordion
            e.preventDefault();                                             //prevent default action
            toggle(id);
        }}>
            <a className="accordion-link">
                <div>
                    <h3>{title}</h3>
                </div>
                <i className={`icon ${isOpen ? 'ion-md-arrow-down' : 'ion-md-arrow-forward'}`}></i>         
            </a>
            {isOpen && coinDetails && (
                <div className="answer">
                    <p>{coinDetails.description}</p>
                    <HistoryChart coinId={id} />
                </div>
            )}
            <hr />
        </div>
    );
};

export default Accordion;
