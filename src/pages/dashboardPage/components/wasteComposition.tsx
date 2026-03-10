import { useEffect, useState, useContext } from "react";
import DoughnutChart from "../../../components/charts/DoughnutChart";
import { WasteDataContext } from "../../../context/wasteDataContext";

export default function WasteComposition() {
  const contextData = useContext(WasteDataContext)
  const [inputData, setInputData] = useState({
    overall_biodegradable: 0,
    overall_residual: 0,
    overall_recyclable: 0,
    overall_infectious: 0,
  })
  

  useEffect(() => {
    let overall_biodegradable = 0
    let overall_residual = 0
    let overall_recyclable = 0
    let overall_infectious = 0
    if (Array.isArray(contextData)) {
      contextData.forEach((item: any) => {
        overall_biodegradable += item.overall_biodegradable
        overall_residual += item.overall_residual
        overall_recyclable += item.overall_recyclable
        overall_infectious += item.overall_infectious
      });
    }
    setInputData({
      overall_biodegradable,
      overall_residual,
      overall_recyclable,
      overall_infectious,
    })
  }, [contextData])
  
  const chartData = [
    { name: "Biodegradable", value: inputData.overall_biodegradable },
    { name: "Residual", value: inputData.overall_residual },
    { name: "Recyclable", value: inputData.overall_recyclable },
    { name: "Infectious", value: inputData.overall_infectious },
  ];
  const colors = ["#21B614", "#000000", "#0267FF", "#F3F375"];

  if (
    !(
      chartData[0].value == 0 &&
      chartData[1].value == 0 &&
      chartData[2].value == 0
    )
  ) {
    return <DoughnutChart data={chartData} colors={colors} />;
  } else {
    return (
      <div className="flex h-full w-full flex-col justify-center items-center">
        <p className="text-center">No Data Available</p>
      </div>
    );
  }
}
