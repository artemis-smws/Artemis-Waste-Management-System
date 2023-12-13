import './index.scss'
import WasteGenerated from "./wasteGenerated";
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
import OverviewCard from './overviewCard';
import DropdownFilter from '../../components/dropdownFilter';


export default function Dashboard() {

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

  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 500); // Adjust the timeout as needed to ensure proper rendering before printing
  };


  return (
    <div>
      <div className="d-flex">
        <div className='hide-dashboard'>
        <Sidebar/>
        </div>
        <div className="vw-100 vh-100 overflow-hidden hide-dashboard">
          <Header handlePrint={handlePrint} />
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
                <DropdownFilter dropdown_header={"Filter"} dropdown_item={[{
                  actions : () => {return 0},
                  label : "Latest"
                }, {
                  actions : () => {return 0},
                  label : "Last 7 days"
                }, {
                  actions : () => {return 0},
                  label : "Last 30 days"
                }
                ]}/>
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
      {isPrinting && <DashboardPrint />}
    </div>
  );
}

function Header({ handlePrint }) {
  return (
    <div className="d-flex border-bottom border-2 shadow align-items-center justify-content-between ps-4 py-3">
      <p className="m-0 fw-bold fs-4">Dashboard</p>
      {/* Call handlePrint function onClick */}
      <button
        type="button"
        className="btn cstm-shadow rounded-pill px-3 me-3"
        onClick={handlePrint}
      >
        <i className="bi bi-printer me-2"></i>
        Print
      </button>
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