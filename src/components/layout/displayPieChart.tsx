import React from "react";
import PieChart from "./chart.js/PieChart";

const data = {
  labels: ["Alangilan", "Pablo Borbon", "Nasugbu"],
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
  },
  maintainAspectRatio: false,
  layout: {
    padding: {
      bottom: 35,
    },
  },
};

const DisplayPieChart: React.FC = () => {
  return <PieChart data={data} options={options}/>;
};

export default DisplayPieChart;
