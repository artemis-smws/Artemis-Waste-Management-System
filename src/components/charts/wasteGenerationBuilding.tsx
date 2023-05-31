import { ChartOptions } from "chart.js";
import PieChart from "../layout/chart.js/PieChart";
import LineChart from "../layout/chart.js/LineChart";
import BarChart from "../layout/chart.js/BarChart";

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
        backgroundColor: "#5e29ff" ,
        borderWidth: 2,
      },
      {
        label : 'Recyclable Waste',
        data:  [29, 37, 18, 39, 31, 26, 16, 35],
        backgroundColor : "#f04337" ,
        borderWidth: 2,
      },
      {
        label : 'Food Waste',
        data: [17, 38, 27, 33, 20, 28, 36, 19],
        backgroundColor: "#419550" ,
        borderWidth: 2,
      }
    ]
  };
  const option: ChartOptions = {
    responsive: true,
    maintainAspectRatio : false,
    
  };

  return <BarChart data={data} options={option} />
}
