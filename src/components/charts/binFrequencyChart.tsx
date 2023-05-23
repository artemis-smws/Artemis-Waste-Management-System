import React, { useEffect, useState } from "react";
import BarChart from "../layout/chart.js/BarChart";
import { ChartData, ChartOptions } from "chart.js";

export default function BinFrequencyChart() {
  const data: ChartData = {
    labels: ["CICS", "CEAFA", "RGR", 'Gym', 'STEER Hub', 'SSC', 'CIT'],
    datasets: [
      {
        data: [15, 23, 34, 24, 22, 30, 12],
        backgroundColor: "#7A0000"
      },
    ],
  };

  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 35,
      },
    },
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return <BarChart data={data} options={options} />;
}
