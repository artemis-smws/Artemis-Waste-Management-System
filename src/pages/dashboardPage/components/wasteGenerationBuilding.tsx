import { useContext, useEffect, useState } from 'react';
import BarChart from "../../../components/charts/BarChart";
import getBuidlingNames from "../utils/getBuildingNames";
import { WasteDataContext } from "../../../context/wasteDataContext";
import addingTwoArrays from "../utils/addingTwoArrays";

// Semantic waste-type colors matching the design system
const bars = [
  { dataKey: "Biodegradable", fill: "#00cb6a", stackId: "a" },
  { dataKey: "Residual",      fill: "#6b7280", stackId: "a" },
  { dataKey: "Recyclable",    fill: "#3b82f6", stackId: "a" },
  { dataKey: "Infectious",    fill: "#ef4444", stackId: "a" },
];

export default function WasteGenerationBuilding() {
  const contextData = useContext(WasteDataContext);
  const [biodegradable, setBiodegradable] = useState<any[]>([]);
  const [recyclable, setRecyclable] = useState<any[]>([]);
  const [infectious, setInfectious] = useState<any[]>([]);
  const [residual, setResidual] = useState<any[]>([]);
  const [buildingName, setBuildingName] = useState<any[]>([]);

  useEffect(() => {
    if (Array.isArray(contextData)) {
      const buildingNames = getBuidlingNames(contextData);
      setBuildingName(buildingNames);
      contextData.forEach((data) => {
        const staged_recyclable: any[] = [];
        const staged_residual: any[] = [];
        const staged_biodegradable: any[] = [];
        const staged_infectious: any[] = [];
        buildingNames.forEach((building_name) => {
          staged_recyclable.push(data[building_name]?.weight?.recyclable?.total ?? 0);
          staged_residual.push(data[building_name]?.weight?.residual ?? 0);
          staged_biodegradable.push(data[building_name]?.weight?.biodegradable ?? 0);
          staged_infectious.push(data[building_name]?.weight?.infectious ?? 0);
        });
        setRecyclable((prev) => (prev.length !== 0 ? addingTwoArrays(prev, staged_recyclable) : staged_recyclable));
        setResidual((prev) => (prev.length !== 0 ? addingTwoArrays(prev, staged_residual) : staged_residual));
        setBiodegradable((prev) => (prev.length !== 0 ? addingTwoArrays(prev, staged_biodegradable) : staged_biodegradable));
        setInfectious((prev) => (prev.length !== 0 ? addingTwoArrays(prev, staged_infectious) : staged_infectious));
      });
    }
  }, [contextData]);

  const chartData = buildingName.map((name, index) => ({
    name,
    Biodegradable: biodegradable[index] ?? 0,
    Residual: residual[index] ?? 0,
    Recyclable: recyclable[index] ?? 0,
    Infectious: infectious[index] ?? 0,
  }));

  return <BarChart data={chartData} bars={bars} />;
}