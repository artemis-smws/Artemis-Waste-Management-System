import { ChartOptions } from "chart.js";
import { useEffect, useState, useContext } from "react";
import PieChart from "../../../components/charts/PieChart";
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
  
  const data = {
    labels: ["Biodegradable", "Residual", "Recyclable", "Infectious"],
    datasets: [
      {
        data: [
          inputData.overall_biodegradable,
          inputData.overall_residual,
          inputData.overall_recyclable,
          inputData.overall_infectious,
        ],
        backgroundColor: ["#21B614", "#000000", "#0267FF", "#F3F375"],
      },
    ],
  };
  const option: ChartOptions = {
    legend: {
      align: "start",  
      display: true,
      position: "bottom"  
    },
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        bottom: 35,
        left: 20,
        right: 20,
      },
    },
  };
  if (
    !(
      data.datasets[0].data[0] == 0 &&
      data.datasets[0].data[1] == 0 &&
      data.datasets[0].data[2] == 0
    )
  ) {
    return <DoughnutChart data={data} options={option} />;
  } else {
    return (
      <div className="h-100 w-100 d-flex flex-column justify-content-center align-item-center">
        <p className="text-center">No Data Available</p>
      </div>
    );
  }
}
