import {useContext, useEffect, useState} from 'react'
import BarChart from "../../../components/charts/BarChart";
import getBuidlingNames from "../utils/getBuildingNames";
import { WasteDataContext } from "../../../context/wasteDataContext";
import addingTwoArrays from "../utils/addingTwoArrays";

export default function WasteGenerationBuilding() { 
  const contextData = useContext(WasteDataContext)
  const [biodegradable, setBiodegradable] = useState<any[]>([])
  const [recyclable, setRecyclable] = useState<any[]>([])
  const [infectious, setInfectious] = useState<any[]>([])
  const [residual, setResidual] = useState<any[]>([])
  const [buildingName, setBuildingName] = useState<any[]>([])
  useEffect(() => {
    if(Array.isArray(contextData)) {
      const buildingNames = getBuidlingNames(contextData)
      setBuildingName(buildingNames)
      contextData.forEach((data) => {
        const staged_recyclable: any[] = []
        const staged_residual: any[] = []
        const staged_biodegradable: any[] = []
        const staged_infectious: any[] = []
        buildingNames.forEach(building_name => {
          staged_recyclable.push(data[building_name].weight.recyclable.total || 0)
          staged_residual.push(data[building_name].weight.residual || 0)
          staged_biodegradable.push(data[building_name].weight.biodegradable || 0)
          staged_infectious.push(data[building_name].weight.infectious || 0)
        })
        setRecyclable((prev) => {
          if(prev.length != 0) {
            return addingTwoArrays(prev, staged_recyclable)
          }
          return staged_recyclable
        })
        setResidual((prev) => {
          if(prev.length != 0) {
            return addingTwoArrays(prev, staged_residual)
          }
          return staged_residual
        })
        setBiodegradable((prev) => {
          if(prev.length != 0) {
            return addingTwoArrays(prev, staged_biodegradable)
          }
          return staged_biodegradable
        })
        setInfectious((prev) => {
          if(prev.length != 0) {
            return addingTwoArrays(prev, staged_infectious)
          }
          return staged_infectious
        })
      })
    }
  }, [contextData])

  const chartData = buildingName.map((name, index) => ({
    name,
    Recyclable: recyclable[index],
    Residual: residual[index],
    Biodegradable: biodegradable[index],
    Infectious: infectious[index]
  }));

  const bars = [
    { dataKey: "Recyclable", fill: "#0267FF", stackId: "a" },
    { dataKey: "Residual", fill: "#000000", stackId: "a" },
    { dataKey: "Biodegradable", fill: "#21B614", stackId: "a" },
    { dataKey: "Infectious", fill: "#F3F375", stackId: "a" }
  ];

  return <BarChart data={chartData} bars={bars} />
}