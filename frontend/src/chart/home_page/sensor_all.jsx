import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import moment from "moment";

const Sensor_all = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && data) {
      const ctx = chartRef.current.getContext("2d");

      // Format dates using Moment.js
      const formattedDates = data.map((item) =>
        moment(item.datetime).format("DD MMM HH:mm:ss")
      );

      const chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: formattedDates,
          datasets: [
            {
              label: "Battery",
              data: data.map((item) => item.battery),
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderWidth: 1,
              yAxisID: "battery",
            },
            {
              label: "Humidity",
              data: data.map((item) => item.humidity),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 1,
              yAxisID: "humidity",
            },
            {
              label: "Linkquality",
              data: data.map((item) => item.linkquality),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 1,
              yAxisID: "linkquality",
            },
            {
              label: "Temperature",
              data: data.map((item) => item.temperature),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 1,
              yAxisID: "temperature",
            },
            {
              label: "Voltage",
              data: data.map((item) => item.voltage),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 1,
              yAxisID: "voltage",
            },
          ],
        },
        options: {
          scales: {
            y: [
              {
                id: "temperature",
                type: "linear",
                position: "left",
                beginAtZero: true,
                ticks: { stepSize: 5 },
              },
              {
                id: "humidity",
                type: "linear",
                position: "right",
                beginAtZero: true,
                ticks: { stepSize: 5 },
              },
              {
                id: "Battery",
                type: "linear",
                position: "right",
                beginAtZero: true,
                ticks: { stepSize: 5 },
              },
              {
                id: "Linkquality",
                type: "linear",
                position: "right",
                beginAtZero: true,
                ticks: { stepSize: 5 },
              },
              {
                id: "Voltage",
                type: "linear",
                position: "right",
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

export default Sensor_all;
