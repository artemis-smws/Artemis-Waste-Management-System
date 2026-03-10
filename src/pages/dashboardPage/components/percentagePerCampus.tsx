import PieChart from "../../../components/charts/PieChart";

export default function PercentagePerCampus() {
  const chartData = [{ name: "Alangilan", value: 100 }];
  const colors = ["#7A0000", "#36A2EB", "#FFCE56"];

  return <PieChart data={chartData} colors={colors} />;
}
