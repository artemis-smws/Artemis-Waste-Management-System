import './index.scss'
import WasteGenerated from "../../components/charts/wasteGenerated";
import PercentagePerCampus from "../../components/charts/percentagePerCampus";
import Sidebar from "../../components/layout/sidebar";
import { GraphDownArrow, GraphUpArrow } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import AdminChartCard from "../../components/adminChartCard";
import WasteComposition from "../../components/charts/wasteComposition";
import WasteGenerationBuilding from "../../components/charts/wasteGenerationBuilding";
import { BuildingLeaderboards } from "../../components/buildingLeaderboards";
import { getCookie } from "../../services/cookies";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase/firebase";
import { Link, Navigate } from "react-router-dom";
import DashboardPrint from "./dashboardPrint";
import ContributionPercentage from "../../components/contributionPercentage";


export default function Dashboard() {
  const [highest_weight, setHighest] = useState({ weight: 0, day: "" });
  const [lowest_weight, setLowest] = useState({ weight: 0, day: "" });
  const [average, setAverage] = useState(0);
  const [currentDoc, setCurrentDoc] = useState({ weight: 0 });
  const {
    overall_food_waste,
    overall_residual_waste,
    overall_recyclable_waste,
  } = localStorage;

  const date = new Date();
  const [user] = useAuthState(auth);
  const username = user?.displayName;

  useEffect(() => {
    const {
      highest_weight,
      highest_day,
      lowest_weight,
      lowest_day,
      average,
      today_weight,
    } = localStorage;
    setHighest({ weight: JSON.parse(highest_weight), day: highest_day });
    setLowest({ weight: JSON.parse(lowest_weight), day: lowest_day });
    setAverage(JSON.parse(average));
    setCurrentDoc({ weight: JSON.parse(today_weight) });
  }, []);

  return (
    <div>
      <div className="d-flex">
        <Sidebar />
        <div className="vw-100 vh-100 overflow-hidden">
          <Header/>
          <div
            className="h-100 w-100 d-flex flex-column align-items-center px-4 py-4 border"
            style={{ overflowY: "scroll", backgroundColor: "#f5f5f5" }}
          >
            {/* section 0 */}
            <div
              className="bg-light d-flex justify-content-center align-items-center border border-3 rounded mb-4"
              style={{ width: "80%" }}
            >
              {/* Lowest Highest Average UI */}
              <div
                style={{ color: "red" }}
                className="d-flex flex-column justify-content-center align-items-center"
                id="highest"
              >
                <h5 className="d-flex align-items-center">
                  <GraphUpArrow className="me-2" />
                  Highest
                </h5>
                <h3>
                  {highest_weight.weight <= 0 && highest_weight.day == ""
                    ? "N/A"
                    : highest_weight.weight + " kg"}
                </h3>
                <h5>
                  {highest_weight.day.length <= 0 ? "" : highest_weight.day}
                </h5>
              </div>
              <div
                style={{ color: "green" }}
                className="d-flex flex-column justify-content-center align-items-center"
                id="lowest"
              >
                <h5 className="d-flex align-items-center">
                  <GraphDownArrow className="me-2" />
                  Lowest
                </h5>
                <h3>
                  {lowest_weight.weight <= 0 && highest_weight.day == ""
                    ? "N/A"
                    : lowest_weight.weight + " kg"}
                </h3>
                <h5>
                  {lowest_weight.day.length <= 0 ? "" : lowest_weight.day}
                </h5>
              </div>
              <div
                style={{ color: "grey" }}
                className="d-flex flex-column justify-content-center align-items-center"
                id="average"
              >
                <h5 className="d-flex align-items-center">Average</h5>
                <h3>{average <= 0 ? "N/A" : average.toPrecision(4) + " kg"}</h3>
              </div>
            </div>
            {/* chart row 1 */}
            <section className="d-flex w-100 flex-column">
              <div className="w-100 my-3 d-flex justify-content-between">
                <h2>Waste Generated</h2>
                <FilterButton />
              </div>
              <div className="w-100 d-flex justify-content-between">
                <AdminChartCard width="60%" header="Overall weight">
                  <WasteGenerated />
                </AdminChartCard>
                <AdminChartCard width="38%" header="Waste composition">
                  <div className="w-50">
                    <WasteComposition />
                  </div>

                  <div className="d-flex flex-column w-50 h-100 justify-content-between p-3 ">
                    <div className="mt-2 py-2 border rounded d-flex flex-column bg-tertiary-red w-100 justify-content-center align-items-center px-4 fw-semibold">
                      <div className="fs-5">Food Waste</div>{" "}
                      <div>{overall_food_waste} kg</div>
                    </div>
                    <div className="mt-2 py-2 border rounded d-flex flex-column bg-tertiary-red w-100 justify-content-center align-items-center px-4 fw-semibold">
                      <div className="fs-5">Residual</div>{" "}
                      <div>{overall_residual_waste} kg</div>
                    </div>
                    <div className="mt-2 py-2 border rounded d-flex flex-column bg-tertiary-red w-100 justify-content-center align-items-center px-4 fw-semibold">
                      <div className="fs-5">Recyclable</div>{" "}
                      <div>{overall_recyclable_waste} kg</div>
                    </div>
                  </div>
                </AdminChartCard>
              </div>
            </section>
            {/* chart row 2 */}
            <section className="w-100 d-flex justify-content-between mt-5">
              <AdminChartCard width="38%" header="Ranking per building">
                <BuildingLeaderboards />
              </AdminChartCard>
              <AdminChartCard width="28%" header="Contribution percentage">
                <ContributionPercentage />
              </AdminChartCard>
              <AdminChartCard width="30%" header="Summary report">
                <body
                  className="w-100 h-100 p-3"
                  style={{ overflowY: "scroll" }}
                >
                  {/* generate whole div on dynamic display */}
                  <div className="border border-2 bg-tertiary-red rounded px-4 py-3 mb-3 fs-5">
                    The current total waste generated and record for this day,{" "}
                    <span className="text-danger fw-semibold">
                      {date.toUTCString().slice(4, 16)}
                    </span>{" "}
                    is{" "}
                    <span className="text-danger fw-semibold">
                      {currentDoc.weight} kg{" "}
                    </span>
                    . The peak day is during the day of{" "}
                    <span className="text-danger fw-semibold">
                      {highest_weight.day}
                    </span>{" "}
                    with the weight of{" "}
                    <span className="text-danger fw-semibold">
                      {highest_weight.weight} kg
                    </span>{" "}
                    while the lowest day is in{" "}
                    <span className="text-danger fw-semibold">
                      {lowest_weight.day}
                    </span>{" "}
                    with the weight of{" "}
                    <span className="text-danger fw-semibold">
                      {lowest_weight.weight} kg
                    </span>
                    .
                  </div>
                </body>
              </AdminChartCard>
            </section>
            {/* chart row 3 */}
            <section className="w-100 d-flex justify-content-between mt-5">
              <AdminChartCard
                width="100%"
                header="Waste generation per building"
                maxHeight="450px"
              >
                <WasteGenerationBuilding />
              </AdminChartCard>
            </section>
            <section className="w-100" style={{ minHeight: "90px" }}></section>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="d-flex border-bottom border-2 shadow align-items-center justify-content-between ps-4 py-3">
      <p className="m-0 fw-bold fs-4">Dashboard</p>
      <Link to='/print' type="button" className="btn cstm-shadow rounded-pill px-3 me-3"
        
      >
        <i className="bi bi-printer me-2"></i>
        Print
      </Link>
    </div>
  );
}

function FilterButton() {
  return (
    <div className="dropdown">
      <button
        role="button"
        data-bs-toggle="dropdown"
        className="btn bg-red dropdown-toggle px-3"
      >
        Filter
      </button>
      <ul className="dropdown-menu">
        <li>
          <a className="dropdown-item" href="#">
            Last 7 days
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Last 30 days
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Year
          </a>
        </li>
      </ul>
    </div>
  );
}