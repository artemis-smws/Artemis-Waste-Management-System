import { ChartOptions } from "chart.js";
import {useEffect, useState} from 'react'
import PieChart from "../../../components/charts/PieChart";
import LineChart from "../../../components/charts/LineChart";
import BarChart from "../../../components/charts/BarChart";
import useFetchLatest from "../../../hooks/useFetchLatest";
import getBuidlingNames from "../utils/getBuildingNames";

export default function WasteGenerationBuilding() { 

  const [biodegradable, setBiodegradable] = useState<any[]>([])
  const [recyclable, setRecyclable] = useState<any[]>([])
  const [infectious, setInfectious] = useState<any[]>([])
  const [residual, setResidual] = useState<any[]>([])
  const [buildingName, setBuildingName] = useState<any[]>([])
  const [status, setStatus] = useState(false)
  useEffect(() => {
    useFetchLatest()
      .then((value) => {
        const buildingNames = getBuidlingNames(value)
        setBuildingName(buildingNames)
        buildingNames.forEach((buildingName) => {
          setRecyclable((prev) => [...prev, value[0][buildingName].weight.recyclable.total])
          setResidual((prev) => [...prev, value[0][buildingName].weight.residual])
          setBiodegradable((prev) => [...prev, value[0][buildingName].weight.biodegradable])
          setInfectious((prev) => [...prev, value[0][buildingName].weight.infectious])
        })
        setStatus((value) && true)
      })
      .catch(e => {
        console.log(e.message)
        setStatus(false)
      })
  }, [])

  const data = {
    labels: buildingName,
    datasets: [
      {
        label : 'Recyclable',
        data: recyclable,
        backgroundColor: "#0267FF" ,
        borderWidth: 2,
      },
      {
        label : 'Residual',
        data: residual,
        backgroundColor: "#000000" ,
        borderWidth: 2,
      },
      {
        label : 'Biodegradable',
        data: biodegradable,
        backgroundColor: "#21B614" ,
        borderWidth: 2,
      },
      {
        label : 'Infectious',
        data: infectious,
        backgroundColor: "#F3F375" ,
        borderWidth: 2,
      }
    ]
  };
  const option: ChartOptions = {
    responsive: true,
    maintainAspectRatio : false,
    scales: {
      xAxes : [
        {
          stacked: true
        }
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          stacked: true
        },
      ],
    }
  };

  return <BarChart data={data} options={option} />
}