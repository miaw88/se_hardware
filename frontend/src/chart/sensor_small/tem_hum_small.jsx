import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import moment from 'moment';

const Sensor_TH = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && data) {
      const ctx = chartRef.current.getContext('2d');
      
      // Format dates using Moment.js
      const formattedDates = data.map((item) => moment(item.datetime).format('DD MMM HH:mm:ss'));

      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: formattedDates,
          datasets: [
            {
              label: 'Temperature',
              data: data.map((item) => item.temperature),
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderWidth: 1,
              yAxisID: 'temperature',
            },
            {
              label: 'Humidity',
              data: data.map((item) => item.humidity),
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 1,
              yAxisID: 'humidity',
            },
          ],
        },
        options: {
          scales: {
            y: [
              {
                id: 'temperature',
                type: 'linear',
                position: 'left',
                beginAtZero: true,
                ticks: { stepSize: 5 },
              },
              {
                id: 'humidity',
                type: 'linear',
                position: 'right',
                beginAtZero: true,
                ticks: { stepSize: 5 },
              },
            ],
          },
        },
      });

      // Clear previous chart
      return () => {
        chart.destroy();
      };
    }
  }, [data]);

  return (
    <canvas ref={chartRef} id="myChart"></canvas>
  );
};

export default Sensor_TH;
