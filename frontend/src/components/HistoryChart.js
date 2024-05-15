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
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const HistoryChart = ({ coinId }) => {
  const [chartData, setChartData] = useState(null);       //initialize chartData state  with null

  useEffect(() => {
    const fetchData = async () => {     //fetch data function
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`);
        const coinChartData = response.data.prices.map(value => ({ x: value[0], y: value[1].toFixed(2) }));   //map prices to x and y values
        setChartData({        //set chartData state with response data
          labels: coinChartData.map(value => moment(value.x).format('MMM DD')),     //map x values to labels
          datasets: [
            {
              fill: true,
              label: coinId,
              data: coinChartData.map(val => val.y),
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
          ]
        });
      } catch (error) {
        console.error("Error fetching historical data:", error);
        setChartData(null);
      }
    };

    if (coinId) {       //check if coinId is available
      fetchData();      //fetch data function   
    }
  }, [coinId]);     //dependency array

  if (!chartData) {     //check if chartData is not available
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Line
        options={{
          plugins: {
            legend: {
              display: true,
            },
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Days',
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Dollars ($)',
              },
            },
          },
          responsive: true,
        }}
        data={chartData}
      />
    </div>
  );
}

export default HistoryChart;
