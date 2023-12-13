import './index.scss'
import WasteGenerated from "../../components/wasteGenerated";
import PercentagePerCampus from "./percentagePerCampus";
import Sidebar from "../../components/layout/sidebar";
import { GraphDownArrow, GraphUpArrow } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import AdminChartCard from "./adminChartCard"; 
import WasteComposition from "./wasteComposition";
import WasteGenerationBuilding from "./wasteGenerationBuilding";
import { BuildingLeaderboards } from "./buildingLeaderboards";
import { getCookie } from "../../utils/cookies";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../services/firebase";
import { Link, Navigate } from "react-router-dom";
import DashboardPrint from "./dashboardPrint";
import ContributionPercentage from "./contributionPercentage";


export default function Dashboard() {
  const [highest_weight, setHighest] = useState({ weight: 0, day: "" });
  const [lowest_weight, setLowest] = useState({ weight: 0, day: "" });
  const [average, setAverage] = useState(0);
  const [currentDoc, setCurrentDoc] = useState({ weight: 0 });
  const {
    overall_biodegradable,
    overall_residual,
    overall_recyclable,
    overall_infectious
  } = localStorage;

  const date = new Date();
  const [user] = useAuthState(auth);
  const username = user?.displayName;

  useEffect(() => {
    const {
      today_weight,
    } = localStorage;
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
            <OverviewCard />
            {/* chart row 1 */}
            <section className="d-flex w-100 flex-column">
              <div className="w-100 my-3 d-flex justify-content-between">
                <h3>Waste Generated</h3>
                <FilterButton />
              </div>
              <div className="w-100 d-flex justify-content-between">
                <AdminChartCard maxHeight='100%' width="60%" header="Overall weight">
                  <WasteGenerated />
                </AdminChartCard>
                <AdminChartCard maxHeight='auto' width="38%" header="Waste composition">
                  <div className="w-50">
                    <WasteComposition />
                  </div>

                  <div className="d-flex flex-column w-50 h-100 justify-content-between p-3 ">
                    <div className="mt-2 py-2 border rounded d-flex flex-column bg-tertiary-red w-100 justify-content-center align-items-center px-4 fw-semibold">
                      <div className="fs-5">Biodegradable</div>{" "}
                      <div>{overall_biodegradable} kg</div>
                    </div>
                    <div className="mt-2 py-2 border rounded d-flex flex-column bg-tertiary-red w-100 justify-content-center align-items-center px-4 fw-semibold">
                      <div className="fs-5">Residual</div>{" "}
                      <div>{overall_residual} kg</div>
                    </div>
                    <div className="mt-2 py-2 border rounded d-flex flex-column bg-tertiary-red w-100 justify-content-center align-items-center px-4 fw-semibold">
                      <div className="fs-5">Recyclable</div>{" "}
                      <div>{overall_recyclable} kg</div>
                    </div>
                    <div className="mt-2 py-2 border rounded d-flex flex-column bg-tertiary-red w-100 justify-content-center align-items-center px-4 fw-semibold">
                      <div className="fs-5">Infectious</div>{" "}
                      <div>{overall_infectious} kg</div>
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