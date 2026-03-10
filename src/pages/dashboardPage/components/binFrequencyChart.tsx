import BarChart from "../../../components/charts/BarChart";

export default function BinFrequencyChart() {
  const labels = ["CICS", "CEAFA", "RGR", 'Gym', 'STEER Hub', 'SSC', 'CIT'];
  const values = [15, 23, 34, 24, 22, 30, 12];
  const chartData = labels.map((label, i) => ({
    name: label,
    Frequency: values[i]
  }));
  const bars = [{ dataKey: "Frequency", fill: "#426E2D" }];

  return <BarChart data={chartData} bars={bars} />;
}
