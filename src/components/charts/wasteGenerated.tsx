import React from "react";
import LineChart from "../layout/chart.js/LineChart";
import {useEffect} from 'react'
import { ChartOptions } from "chart.js";




export default function WasteGenerated () {
  const data_values: any[] = []
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://us-central1-artemis-b18ae.cloudfunctions.net/server/waste' , {
        method : 'GET'
      })
      const json = await response.json()
      json.forEach((doc:any) => {
        data_values.push(doc.overall_weight)
      })
    } 
    fetchData()
    console.log(data_values);
    
  }, [])

  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        data: [14,15,51,21,15,21,42],
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  
  
  const options : ChartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    maintainAspectRatio: false,
    legend : {
      display : false
    }
  };

  return <LineChart  data={data} options={options}/>;
};

