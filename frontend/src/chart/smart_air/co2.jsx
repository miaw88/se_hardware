import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import moment from 'moment';

const Co2_smart = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current && data && data.length > 0) {
            const ctx = chartRef.current.getContext('2d');

            // Extract the latest item from the data
            const latestData = data[data.length - 1];

            // Format date using Moment.js
            const formattedDate = moment(latestData.datetime).format('DD MMM HH:mm:ss');

            const chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: [formattedDate],
                    datasets: [
                        {
                            label: 'Co2',
                            data: [latestData.co2],
                            borderColor: 'rgba(255, 99, 132, 1)',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderWidth: 1,
                            yAxisID: 'co2',
                        },
                    ],
                },
                options: {
                    scales: {
                        y: [
                            {
                                id: 'co2',
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

    return <canvas ref={chartRef} id="myChart"></canvas>;
};

export default Co2_smart;
