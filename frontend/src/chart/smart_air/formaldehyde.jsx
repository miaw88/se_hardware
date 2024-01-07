import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import moment from 'moment';

const Formaldehyde_smart = ({ data, timeRange, selectedTimeRange }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && data) {
      const ctx = chartRef.current.getContext('2d');
      
      const filterDataByTimeRange = (data, timeRange) => {
        const currentDate = moment();
        switch (timeRange) {
          case 'now':
            return data.filter((item) => moment(item.datetime).isSameOrAfter(currentDate.subtract(1, 'hours')));
          case '1day':
            return data.filter((item) => moment(item.datetime).isSameOrAfter(currentDate.subtract(1, 'days')));
          case '7days':
            return data.filter((item) => moment(item.datetime).isSameOrAfter(currentDate.subtract(7, 'days')));
          case '30days':
            return data.filter((item) => moment(item.datetime).isSameOrAfter(currentDate.subtract(30, 'days')));
          default:
            return data;
        }
      };
      
      const filteredData = filterDataByTimeRange(data, timeRange || selectedTimeRange);       
      // Format dates using Moment.js
      const formattedDates = filteredData.map((item) => moment(item.datetime).format('DD MMM HH:mm:ss'));

      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: formattedDates,
          datasets: [
            {
              label: 'Formaldehyde',
              data: filteredData.map((item) => item.formaldehyd),
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderWidth: 1,
              yAxisID: 'formaldehyde',
            },
          ],
        },
        options: {
          scales: {
            y: [
              {
                id: 'formaldehyde',
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
  }, [data, timeRange, selectedTimeRange]);

  return (
    <canvas ref={chartRef} id="myChart"></canvas>
  );
};

export default Formaldehyde_smart;
