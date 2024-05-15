import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {              //Dashboard component
    const [chartData, setChartData] = useState();               //initialize chartData state

    const fetchData = async () => {             //fetch data function
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                params: {
                    vs_currency: 'usd',
                    ids: 'bitcoin,ethereum'
                }
            });
            setChartData({          //set chartData state with response data
                labels: response.data.map(coin => coin.name),
                datasets: [{
                    label: 'Current Price in USD',
                    data: response.data.map(coin => coin.current_price),
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            });
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    useEffect(() => {
        fetchData();                    //fetch data function
    }, []);

    return (
        <div>
            <h2>Cryptocurrency Prices</h2>
            {chartData ? <Line data={chartData} /> : <p>Loading...</p>}
        </div>
    );
}

export default Dashboard;
