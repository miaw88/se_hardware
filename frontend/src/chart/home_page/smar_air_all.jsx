import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import moment from "moment";

const Smart_all = ({ data }) => {
  const chartRef = useRef(null);
  console.log(data);
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
              label: "Co2",
              data: data.map((item) => item.co2),
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderWidth: 1,
              yAxisID: "co2",
            },
            {
              label: "Formaldehyde",
              data: data.map((item) => item.formaldehyd),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 1,
              yAxisID: "formaldehyde",
            },
            {
              label: "Humidity",
              data: data.map((item) => item.humidity),
              borderColor: "rgba(255, 206, 86, 1)",
              backgroundColor: "rgba(255, 206, 86, 0.2)",
              borderWidth: 1,
              yAxisID: "humidity",
            },
            {
              label: "Linkquality",
              data: data.map((item) => item.linkquality),
              borderColor: "rgba(54, 162, 235, 1)",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderWidth: 1,
              yAxisID: "linkquality",
            },
            {
              label: "PM2.5",
              data: data.map((item) => item.pm25),
              borderColor: "rgba(153, 102, 255, 1)",
              backgroundColor: "rgba(153, 102, 255, 0.2)",
              borderWidth: 1,
              yAxisID: "PM2.5",
            },
            {
              label: "Temperature",
              data: data.map((item) => item.temperature),
              borderColor: "rgba(255, 159, 64, 1)",
              backgroundColor: "rgba(255, 159, 64, 0.2)",
              borderWidth: 1,
              yAxisID: "temperature",
            },
            {
              label: "voc",
              data: data.map((item) => item.voc),
              borderColor: "rgba(255, 69, 0, 1)",
              backgroundColor: "rgba(255, 69, 0, 0.2)",
              borderWidth: 1,
              yAxisID: "voc",
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

export default Smart_all;
