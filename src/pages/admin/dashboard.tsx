import WasteGenerated from "../../components/charts/wasteGenerated";
import PercentagePerCampus from "../../components/charts/percentagePerCampus";
import Sidebar from "../../components/layout/sidebar";
import { GraphDownArrow, GraphUpArrow } from "react-bootstrap-icons";
import { useState } from "react";
import AdminChartCard from "../../components/adminChartCard";
import WasteComposition from "../../components/charts/wasteComposition";
import WasteGenerationBuilding from "../../components/charts/wasteGenerationBuilding";

export default function Dashboard() {
  const [highest_weight, setHighest] = useState({ weight: 98, day: "May 12" });
  const [lowest_weight, setLowest] = useState({ weight: 12, day: "May 15" });
  const [average, setAverage] = useState(43.12);

  const date = new Date();

  return (
    <div>
      <div className="d-flex">
        <Sidebar />
        <div className="vw-100 vh-100 overflow-hidden">
          <Header />
          <div
            className="h-100 w-100 d-flex flex-column align-items-center px-4 py-4 border"
            style={{ overflowY: "scroll" }}
          >
            {/* Lowest Highest Average UI */}
            <div className="cstm-shadow d-flex justify-content-center align-items-center w-100 border border-3 rounded mb-4">
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
                  {highest_weight.weight <= 0 ? "N/A" : highest_weight.weight + " kg"}
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
                  {lowest_weight.weight <= 0 ? "N/A" : lowest_weight.weight + " kg"}
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
                <h3>{average <= 0 ? "N/A" : average}</h3>
              </div>
            </div>
            {/* chart row 1 */}
            <section className="w-100 d-flex justify-content-between">
              <AdminChartCard width="68%" header="Waste Generated">
                <WasteGenerated />
              </AdminChartCard>
              <AdminChartCard width="30%" header="Percentage per campus">
                <PercentagePerCampus />
              </AdminChartCard>
            </section>
            {/* chart row 2 */}
            <section className="w-100 d-flex justify-content-between mt-4">
              <AdminChartCard width="38%" header="Waste composition">
                <div className="w-50 h-100">
                  <WasteComposition />
                </div>

                <div className="d-flex flex-column w-50 justify-content-center">
                  <div className="d-flex w-100 justify-content-between px-4">
                    Food Waste <div>25%</div>
                  </div>
                  <div className="d-flex w-100 justify-content-between px-4">
                    Residual <div>45%</div>
                  </div>
                  <div className="d-flex w-100 justify-content-between px-4">
                    Recyclable <div>30%</div>
                  </div>
                </div>
              </AdminChartCard>
              <AdminChartCard width="28%" header="Contribution percentage">
                <body className="w-100 h-100 d-flex flex-column justify-content-evenly align-items-center p-3">
                  <p className="m-0">
                    Percentage to overall waste production in the Philippines
                  </p>
                  <h1>{"0.0004%"}</h1>
                  <p className="m-0">
                    Based on 2.7M tons average of the Philippines in 2022
                  </p>
                </body>
              </AdminChartCard>
              <AdminChartCard width="30%" header="Summary report">
                <body
                  className="w-100 h-100 p-3"
                  style={{ overflowY: "scroll" }}
                >
                  {/* generate whole div on dynamic display */}
                  <div className="bg-red border border-0 rounded px-2 py-4 mb-3">
                    The total solid waste generation of Batangas State
                    University for the month of {date.toUTCString().slice(8,16)} is {'0kg'}. The peak day during
                    the month is {'N/A'} while the lowest day is in {'N/A'}.
                  </div>
                </body>
              </AdminChartCard>
            </section>
            {/* chart row 3 */}
            <section className="w-100 d-flex justify-content-between mt-4">
              <AdminChartCard
                width="68%"
                header="Waste generation per building"
              >
                <WasteGenerationBuilding />
              </AdminChartCard>
              <AdminChartCard width="30%" header="Ranking per building">
                <body
                  className="w-100 h-100 p-3"
                  style={{ overflowY: "scroll" }}
                >
                  <ol className="list-group list-group-numbered">
                    <li className="d-flex justify-content-between list-group-item">
                      <div>Gymnasium</div>
                      <div>108kg</div>
                    </li>
                    <li className="d-flex justify-content-between list-group-item">
                      <div>CEAFA Building</div>
                      <div>115kg</div>
                    </li>
                    <li className="d-flex justify-content-between list-group-item">
                      <div>CIT Building</div>
                      <div>122kg</div>
                    </li>
                    <li className="d-flex justify-content-between list-group-item">
                      <div>CICS Building</div>
                      <div>129kg</div>
                    </li>
                    <li className="d-flex justify-content-between list-group-item">
                      <div>SSC Building</div>
                      <div>136kg</div>
                    </li>
                    <li className="d-flex justify-content-between list-group-item">
                      <div>STEER Hub</div>
                      <div>143kg</div>
                    </li>
                    <li className="d-flex justify-content-between list-group-item">
                      <div>RGR Building</div>
                      <div>150kg</div>
                    </li>
                  </ol>
                </body>
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
      <button type="button" className="btn cstm-shadow rounded-pill px-3 me-3">
        <i className="bi bi-printer me-2"></i>
        Print
      </button>
    </div>
  );
}
