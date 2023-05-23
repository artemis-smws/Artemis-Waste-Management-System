import { ChartOptions } from "chart.js";
import PieChart from "../layout/chart.js/PieChart";
import DoughnutChart from "../layout/chart.js/DoughnutChart";

export default function WasteComposition() {
  const data = {
    labels: ["Food waste", "Residual", "Recyclable"],
    datasets: [
      {
        data: [25, 45, 30],
      backgroundColor: ["#419550", "#EDE92D", "#00C8F4"],
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
