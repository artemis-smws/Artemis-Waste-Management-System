import LineChart from "../../../components/charts/LineChart";
import { useContext, useEffect, useState } from "react";
import { ChartOptions } from "chart.js";
import { WasteDataContext } from "../../../context/wasteDataContext";

export default function WasteGenerated() {
  const contextData = useContext(WasteDataContext)
  const [dataWeight, setDataWeight] = useState(Array<number>)
  const [dataDay, setDataDay]  = useState(Array<string>)
  

  useEffect(() => {
    const staged_weights: number[] = []
    const staged_days: string[] = [] 
    if (Array.isArray(contextData)) {
      contextData.forEach((item: any) => {
        const {overall_weight, id} = item
        staged_weights.push(overall_weight)
        const date = id.split("-")
        staged_days.push(date[0] + "-" + date[1])
      });
    }
    setDataWeight(staged_weights.reverse())
    setDataDay(staged_days.reverse())
    console.log(staged_weights)
    console.log(staged_days)
  }, [contextData]);

  const data = {
    labels:  dataDay,
    datasets: [
      {
        data: dataWeight,
        fill: true,
        borderColor: "grey",
        tension: 0.2,
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
