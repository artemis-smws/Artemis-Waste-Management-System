import { ChartOptions } from "chart.js";
import PieChart from "../layout/chart.js/PieChart";
import LineChart from "../layout/chart.js/LineChart";

interface Props {
  data ?: Object
}

export default function WasteGenerationBuilding() {
  const data = {
    labels: ["CICS", "CEAFA", "RGR", 'Gym', 'STEER Hub', 'SSC', 'CIT'],
    datasets: [
      {
        label : 'Residual Waste',
        data: [15, 23, 34, 24, 22, 30, 12],
        borderColor: "#5e29ff" ,
        backgroundColor : 'transparent',
        tension: 0,
      },
      {
        label : 'Recyclable Waste',
        data:  [22, 17, 26, 30, 19, 28, 15],
        borderColor: "#f04337",
        backgroundColor : 'transparent',
        tension: 0,
      },
      {
        label : 'Food Waste',
        data: [32, 24, 33, 21, 18, 27, 35],
        borderColor: "#419550",
        backgroundColor : 'transparent',
        tension: 0,
      }
    ],
  };
  const option: ChartOptions = {
    responsive: true,
    maintainAspectRatio : false
  };

  return <LineChart data={data} options={option} />
}
