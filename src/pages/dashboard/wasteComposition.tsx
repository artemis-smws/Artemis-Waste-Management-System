import { ChartOptions } from "chart.js";
import { useEffect, useState, useContext } from "react";
import PieChart from "../../components/charts/PieChart";
import DoughnutChart from "../../components/charts/DoughnutChart";

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
  if(!(data.datasets[0].data[0] == 0 && data.datasets[0].data[1] == 0 && data.datasets[0].data[2] == 0)) {
    return <DoughnutChart data={data} options={option} />
  } else {
    return <div className="h-100 w-100 d-flex flex-column justify-content-center align-item-center">
      <p className="text-center">No Data Available</p>
    </div>
  }
}
