import React from "react";
import LineChart from "../layout/chart.js/LineChart";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My Dataset",
      data: [10, 20, 30, 40, 50, 60, 70],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};


const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  maintainAspectRatio: false 
};

const WasteGenerated: React.FC = () => {
  return <LineChart  data={data} options={options}/>;
};

export default WasteGenerated;