import { ChartOptions } from "chart.js";
import PieChart from "../layout/chart.js/PieChart";

export default function WasteComposition() {
  const data = {
    labels: ["Food waste", "Residual", "Recyclable"],
    datasets: [
      {
        data: [1, 22, 30],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
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

  return <PieChart data={data} options={option} />
}
