import { ChartOptions } from "chart.js";
import { useEffect, useState, useContext } from "react";
import PieChart from "../layout/chart.js/PieChart";
import DoughnutChart from "../layout/chart.js/DoughnutChart";

export default function WasteComposition() {
  const {overall_food_waste, overall_residual_waste, overall_recyclable_waste} = localStorage
  const data = {
    labels: ["Food waste", "Residual", "Recyclable"],
    datasets: [
      {
        data: [overall_food_waste, overall_residual_waste, overall_recyclable_waste],
      backgroundColor: ["#419550", "#5e29ff", "#f04337"],
      },
    ],
  };
  const option: ChartOptions = {
    legend : {
        display: false
    },
    responsive: true,
    maintainAspectRatio : false,
    layout: {
      padding: {
        bottom: 35,
        left : 20,
        right : 20,
      },
    },
  };

  return <DoughnutChart data={data} options={option} />
}
