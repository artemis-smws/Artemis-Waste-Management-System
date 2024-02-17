import PieChart from "../../../components/charts/PieChart";
import { ChartData, ChartOptions } from "chart.js";

export default function PercentagePerCampus() {
  const data: ChartData = {
    labels: ["Alangilan"],
    datasets: [
      {
        data: [100],
        backgroundColor: ["#7A0000", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const options: ChartOptions = {
    title: {
      display: true,
    },
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        bottom: 35,
      },
    },
  };

  return <PieChart data={data} options={options} />;
}
