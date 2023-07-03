import { ChartOptions } from "chart.js";
import {useEffect, useState} from 'react'
import PieChart from "../layout/chart.js/PieChart";
import LineChart from "../layout/chart.js/LineChart";
import BarChart from "../layout/chart.js/BarChart";

export default function WasteGenerationBuilding() { 


  const [buildingData, setbuildingData] = useState<any[]>([])
  const [buildingName, setBuildingName] = useState<any[]>([])
  useEffect(() => {
    const {buildingDataObj} = localStorage
    const buildingData = JSON.parse(buildingDataObj)
    const keys = Object.keys(buildingData)
    const values = Object.values(buildingData)
    for(let i = 0; i < keys.length; i++){
      if(keys[i]) {
        setBuildingName(prev => [...prev, keys[i]])
      }
      if(values[i]) {
        setbuildingData(prev => [...prev, values[i]])
      }
    }
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