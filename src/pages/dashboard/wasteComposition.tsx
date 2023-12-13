import { ChartOptions } from "chart.js";
import { useEffect, useState, useContext } from "react";
import PieChart from "../../components/charts/PieChart";
import DoughnutChart from "../../components/charts/DoughnutChart";

export default function WasteComposition() {
  const {
    overall_biodegradable,
    overall_residual,
    overall_recyclable,
    overall_infectious,
  } = localStorage;
  const data = {
    labels: ["Biodegradable", "Residual", "Recyclable", "Infectious"],
    datasets: [
      {
        data: [
          overall_biodegradable,
          overall_residual,
          overall_recyclable,
          overall_infectious,
        ],
        backgroundColor: ["#21B614", "#000000", "#0267FF", "#F3F375"],
      },
    ],
  };
  const option: ChartOptions = {
    legend: {
      align: "start",  
      display: true,
      position: "bottom"  
    },
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        bottom: 35,
        left: 20,
        right: 20,
      },
    },
  };
  if (
    !(
      data.datasets[0].data[0] == 0 &&
      data.datasets[0].data[1] == 0 &&
      data.datasets[0].data[2] == 0
    )
  ) {
    return <DoughnutChart data={data} options={option} />;
  } else {
    return (
      <div className="h-100 w-100 d-flex flex-column justify-content-center align-item-center">
        <p className="text-center">No Data Available</p>
      </div>
    );
  }
}
