import React from "react";
import DoughnutChart from "./chart.js/DoughnutChart";

const data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      data: [10, 20, 30],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
};

const options = {
  title: {
    display: true,
    text: "My Doughnut Chart",
  },
};

const DisplayDougnutChart: React.FC = () => {
  return <DoughnutChart data={data} options={options} />;
};


export default DisplayDougnutChart;
