import { ReactNode, useContext, useEffect, useState } from "react";
import webSocketFetchData from "../../utils/webSocketFetchData";
import fetchDataFactory from "../../api/fetchDataFactory";
import calculateOverallAverage from "./calculateOverallAverge";
import calculateTotal from "./calculateTotal";
import getBuidlingNames from "./getBuildingNames";

const wasteResource = fetchDataFactory("latest/30days");
const highestWasteResource = fetchDataFactory("highest");
const lowestWasteResource = fetchDataFactory("lowest");

function getBuildingNames(keys : string []) {
  const returnList : string [] = []
  keys.forEach(key => {
    if(key != "createdAt" && key != "overall_biodegradable" && key != "overall_recyclable" && key != "overall_residual" && key != "overall_infectious" && key != "overall_weight" && key != "id") {
      returnList.push(key)
    }
  })
  return returnList
}

export default function DashboardPrint() {
  const wasteData = wasteResource.read();
  const highestWasteData = highestWasteResource.read();
  const lowestWasteData = lowestWasteResource.read();
  const {
    total_weight,
    total_biodegradable,
    total_infectious,
    total_recyclable,
    total_residual,
  } = calculateTotal(wasteData);
  
  const keys = Object.keys(wasteData[0])
  const buildingNames = getBuildingNames(keys)

  // const buildingNames = getBuildingNames(wasteData[0])


  const tableRows = generateTableRows(wasteData);
  const reportDate = getCurrentDate();
  return (
    <div className="vw-100 vh-100">
      <br />
      <div
        className="d-flex justify-content-center align-items-center"
        id="report-title"
      >
        ArteMIS Last 30 days Report
      </div>
      <div
        className="d-flex justify-content-center align-items-center"
        id="report-date"
      >
        {reportDate}
      </div>
      <div className="d-flex flex-column justify-content-center">
        <br />
        <div id="table-1">
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            id="table-title"
          >
            <h1>Table 1.</h1>
            <p>Waste Collected within the last 30 days measured by (kg)</p>
          </div>
          <table className="table table-bordered">
            <thead>{generateTableHeader()}</thead>
            <tbody>
              {tableRows}
              <tr
                style={{
                  backgroundColor: "green",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                {/* ... (total row) */}
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <br />
        <div id="table-2">
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            id="table-title"
          >
            <h1>Table 2.</h1>
            <h1>Summary Report</h1>
            <p>
              On the table, show which day has the highest and lowest amounts of
              gathered waste, as well as the average waste.
            </p>
          </div>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Highest Waste Gathered in Day</td>
                <td
                  style={{
                    backgroundColor: "#fcd4dc",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {highestWasteData[0].overall_weight}
                </td>
              </tr>
              <tr>
                <td>Lowest Waste Gathered in a Day</td>
                <td
                  style={{
                    backgroundColor: "#fcd4dc",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {lowestWasteData[0].overall_weight}
                </td>
              </tr>
              <tr>
                <td>Average Waste Gathered in a Month</td>
                <td
                  style={{
                    backgroundColor: "#fcd4dc",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {calculateOverallAverage(wasteData)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <br />
        <div id="table-3">
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            id="table-title"
          >
            <h1>Table 3.</h1>
            <h1>Waste Composition</h1>
            <p>
              On the table, show the percent of the different categories of
              waste that were gathered.
            </p>
          </div>
          <table className="table table-bordered">
            <tbody>
              <tr>
                {/* TODO: get from data */}
                <td>Infectious</td>
                <td
                  style={{
                    backgroundColor: "#fcd4dc",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {`${((total_infectious / total_weight) * 100).toFixed(2)}%`}
                </td>
              </tr>
              <tr>
                <td>Residual</td>
                <td
                  style={{
                    backgroundColor: "#fcd4dc",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {`${((total_residual / total_weight) * 100).toFixed(2)}%`}
                </td>
              </tr>
              <tr>
                <td>Recyclable</td>
                <td
                  style={{
                    backgroundColor: "#fcd4dc",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {`${((total_recyclable / total_weight) * 100).toFixed(2)}%`}
                </td>
              </tr>
              <tr>
                <td>Biodegradable</td>
                <td
                  style={{
                    backgroundColor: "#fcd4dc",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {`${((total_biodegradable / total_weight) * 100).toFixed(2)}%`}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <br />
        <div id="table-4">
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            id="table-title"
          >
            <h1>Ranking Per Building</h1>
            <p>On waste production (rank highest when lower production)</p>
          </div>
          <table className="table table-bordered">
            <tbody>
              {buildingNames.map((building : string) => (
                <tr>
                {/* TODO: call building data */}
                <td>{building}</td>
                <td
                  style={{
                    backgroundColor: "#fcd4dc",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {wasteData[0][building].weight.total || 0}
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

interface TableData {
  date?: string;
  overall_residual?: number;
  overall_recyclable?: number;
  overall_biodegradable?: number;
  overall_infectious?: number;
  overall_weight?: number;
}
const generateTableRows = (data: any) => {
  const stageData: [TableData] = [{}];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  data.forEach((doc: any) => {
    const id: string = doc.id;
    const date = id.split("-");
    stageData.push({
      date: `${monthNames[Number(date[0]) - 1]} ${date[1]}, ${date[2]}`,
      overall_biodegradable: doc.overall_biodegradable,
      overall_infectious: doc.overall_infectious,
      overall_recyclable: doc.overall_recyclable,
      overall_residual: doc.overall_residual,
      overall_weight: doc.overall_weight,
    });
  });
  return stageData.map((doc: TableData, index: number) => (
    <tr key={index}>
      <td>{doc.date}</td>
      <td>{doc.overall_residual}</td>
      <td>{doc.overall_biodegradable}</td>
      <td>{doc.overall_recyclable}</td>
      <td>{doc.overall_infectious}</td>
      <td style={{ fontWeight: "bold" }}>{doc.overall_weight}</td>
    </tr>
  ));
};

function generateTableHeader() {
  const tableHeaders = [
    { label: "Date", style: { color: "black", backgroundColor: "#fcd4dc" } },
    {
      label: "Residuals",
      style: { color: "black", backgroundColor: "#fcd4dc" },
    },
    {
      label: "Biodegradable",
      style: { color: "black", backgroundColor: "#fcd4dc" },
    },
    {
      label: "Recyclable",
      style: { color: "black", backgroundColor: "#fcd4dc" },
    },
    {
      label: "Infectious",
      style: { color: "black", backgroundColor: "#fcd4dc" },
    },
    {
      label: "Total Solid Waste Generated",
      style: { color: "black", backgroundColor: "#fcd4dc" },
    },
  ];
  return (
    <tr>
      {tableHeaders.map((header, index) => (
        <th key={index} style={header.style}>
          {header.label}
        </th>
      ))}
    </tr>
  );
}
//TODO: Replace depending on the current date in the data
function getCurrentMonth() {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  return { month, year }; // object "December" "2023"
}

function getCurrentDate() {
  const currentDate = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();
  return `${month} ${year}`; // December-2023
}
