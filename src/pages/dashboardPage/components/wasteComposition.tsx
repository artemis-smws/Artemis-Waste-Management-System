import { useEffect, useState, useContext } from "react";
import DoughnutChart from "../../../components/charts/DoughnutChart";
import { WasteDataContext } from "../../../context/wasteDataContext";

// Semantic waste-type color palette from the design system
const WASTE_COLORS = ["#00cb6a", "#6b7280", "#3b82f6", "#ef4444"];

export default function WasteComposition() {
  const contextData = useContext(WasteDataContext);
  const [inputData, setInputData] = useState({
    overall_biodegradable: 0,
    overall_residual: 0,
    overall_recyclable: 0,
    overall_infectious: 0,
  });

  useEffect(() => {
    let overall_biodegradable = 0;
    let overall_residual = 0;
    let overall_recyclable = 0;
    let overall_infectious = 0;
    if (Array.isArray(contextData)) {
      contextData.forEach((item: any) => {
        overall_biodegradable += item.overall_biodegradable ?? 0;
        overall_residual += item.overall_residual ?? 0;
        overall_recyclable += item.overall_recyclable ?? 0;
        overall_infectious += item.overall_infectious ?? 0;
      });
    }
    setInputData({
      overall_biodegradable,
      overall_residual,
      overall_recyclable,
      overall_infectious,
    });
  }, [contextData]);

  const chartData = [
    { name: "Biodegradable", value: inputData.overall_biodegradable },
    { name: "Residual", value: inputData.overall_residual },
    { name: "Recyclable", value: inputData.overall_recyclable },
    { name: "Infectious", value: inputData.overall_infectious },
  ];

  const hasData = chartData.some((d) => d.value > 0);

  if (!hasData) {
    return (
      <div className="flex h-full w-full flex-col justify-center items-center gap-2">
        <span className="text-3xl">📊</span>
        <p className="text-sm text-gray-400 text-center">No data available</p>
      </div>
    );
  }

  return <DoughnutChart data={chartData} colors={WASTE_COLORS} />;
}
