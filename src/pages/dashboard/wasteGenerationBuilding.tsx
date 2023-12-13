import { ChartOptions } from "chart.js";
import {useEffect, useState} from 'react'
import PieChart from "../../components/charts/PieChart";
import LineChart from "../../components/charts/LineChart";
import BarChart from "../../components/charts/BarChart";
import useFetchLatest from "../../hooks/useFetchLatest";
import getBuidlingNames from "./getBuildingNames";

export default function WasteGenerationBuilding() { 


  const [buildingData, setbuildingData] = useState<any[]>([])
  const [buildingName, setBuildingName] = useState<any[]>([])
  const [status, setStatus] = useState(false)
  useEffect(() => {
    const data = useFetchLatest()
      .then((value) => {
        setStatus((value) && true)
        const buildingNames = getBuidlingNames(value)
        setBuildingName(buildingNames)
        buildingNames.forEach((buildingName) => {
          setbuildingData((prev) => [...prev, value[0][buildingName].weight.total])
        })
        console.log({data: buildingData})
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
        label : 'Overall Waste Generated',
        data: buildingData,
        backgroundColor: "#f04337" ,
        borderWidth: 2,
      }
    ]
  };
  const option: ChartOptions = {
    responsive: true,
    maintainAspectRatio : false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    }
  };

  return <BarChart data={data} options={option} />
}

async function fetchData() {
  const data = await fetch(
    "https://us-central1-artemis-b18ae.cloudfunctions.net/server/waste/latest",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  const latestDocs = await data.json()
  
}