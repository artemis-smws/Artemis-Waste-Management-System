import LineChart from "../layout/chart.js/LineChart";
import { useEffect, useState } from "react";
import { ChartOptions } from "chart.js";

export default function WasteGenerated() {
  let [dataWeight, setDataWeight] = useState([])
  let [dataDay, setDataDay]  = useState([])
  

  useEffect(() => {
    const {total_weights, days_list} = localStorage;
    const staged_weights = total_weights.split(',').reverse()
    const staged_days = days_list.split(',').reverse()
    setDataWeight(staged_weights)
    setDataDay(staged_days)
  }, []);

  const data = {
    labels:  dataDay,
    datasets: [
      {
        data: dataWeight,
        fill: true,
        borderColor: "grey",
        tension: 0.1,
      },
    ],
  };

  const options: ChartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
  };

  return <LineChart data={data} options={options} />;
}
