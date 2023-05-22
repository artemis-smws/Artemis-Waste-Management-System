import React from "react";
import PieChart from "../layout/chart.js/PieChart";
import { ChartOptions } from "chart.js";

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

const options : ChartOptions = {
  title: {
    display: true,
  },
  responsive : true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      bottom: 35,
    },
  }
};

const PercentagePerCampus: React.FC = () => {
  return <PieChart data={data} options={options}/>;
};

export default PercentagePerCampus;
