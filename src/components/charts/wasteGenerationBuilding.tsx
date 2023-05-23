import { ChartOptions } from "chart.js";
import PieChart from "../layout/chart.js/PieChart";
import LineChart from "../layout/chart.js/LineChart";

interface Props {
  data ?: Object
}

export default function WasteGenerationBuilding() {
  const data = {
    labels: ["CICS", "CEAFA", "RGR"],
    datasets: [
      {
        data: [1, 22, 30],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };
  const option: ChartOptions = {
    responsive: true,
    maintainAspectRatio : false
  };

  return <LineChart data={data} options={option} />
}
