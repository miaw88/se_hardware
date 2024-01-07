import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import moment from 'moment';

const Pm25_smart = ({ data }) => {
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
              label: 'pm2.5',
              data: data.map((item) => item.pm25),
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderWidth: 1,
              yAxisID: 'pm2.5',
            },
                      ],
        },
        options: {
          scales: {
            y: [
              {
                id: 'pm2.5',
                type: 'linear',
                position: 'left',
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

export default Pm25_smart;
