import "./index.scss";
import WasteGenerated from "./components/wasteGenerated";
import PercentagePerCampus from "./components/percentagePerCampus";
import Sidebar from "../../components/layout/sidebar";
import { GraphDownArrow, GraphUpArrow } from "react-bootstrap-icons";
import { useState, useEffect, Suspense, createContext } from "react";
import AdminChartCard from "./components/adminChartCard";
import WasteComposition from "./components/wasteComposition";
import WasteGenerationBuilding from "./components/wasteGenerationBuilding";
import { BuildingLeaderboards } from "./components/buildingLeaderboards";
import { getCookie } from "../../utils/cookies";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../services/firebase";
import { Link, Navigate } from "react-router-dom";
import DashboardPrint from "./components/printDashboard";
import ContributionPercentage from "./components/contributionPercentage";
import OverviewCard from "./components/overviewCard";
import DropdownFilter from "../../components/dropdownFilter";
import fetchDataFactory from "../../api/fetchDataFactory";
import LoadingPage from "../../components/loadingPage";
import { WasteDataContext } from "../../context/wasteDataContext";
import { Dropdown } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";
import calculateTotal from "./utils/calculateTotal";

export default function Dashboard() {
	const [wasteData, setWasteData]: any = useState();
	const [loading, setLoading] = useState(true);

	const [user] = useAuthState(auth);
	const username = user?.displayName;

	const [isPrinting, setIsPrinting] = useState(false);

	const handlePrint = () => {
		setIsPrinting(true);
		document.body.style.overflowY = "hidden";

		setTimeout(() => {
			window.print();
			setIsPrinting(false);
		}, 500); // Adjust the timeout as needed to ensure proper rendering before printing
	};
	const handleFilterButton = (
		event: React.MouseEvent<HTMLElement, MouseEvent>,
		api_endpoint: string,
		data_name: string
	) => {
		event.preventDefault();
		setLoading(true);
		useFetch(api_endpoint, data_name)
			.then((res: any) => {
				setWasteData(res);
			})
			.finally(() => setLoading(false))
			.catch((e: unknown) => {
				e instanceof Error && console.log(e.message);
			});
	};

	useEffect(() => {
		useFetch("waste/latest/7days", "7days")
			.then((res: any) => {
				setWasteData(res);
			})
			.finally(() => setLoading(false))
			.catch((e: unknown) => {
				e instanceof Error && console.log(e.message);
			});
	}, []);

	return (
		// TODO: Change loading / skeleton loading page'
		<WasteDataContext.Provider value={wasteData}>
			{loading ? (
				<LoadingPage />
			) : (
				<div id="dashboard">
					<div className="d-flex">
						<div className="hide-dashboard">
							<Sidebar />
						</div>
						<div className="vw-100 vh-100 overflow-hidden hide-dashboard">
							<Header handlePrint={handlePrint} />
							<div
								className="h-100 w-100 d-flex flex-column align-items-center px-4 py-4 border"
								style={{
									overflowY: "scroll",
									backgroundColor: "#f5f5f5",
								}}
							>
								{/* section 0 */}
								<OverviewCard />
								{/* chart row 1 */}
								<section className="d-flex w-100 flex-column">
									<div className="w-100 my-3 d-flex justify-content-between">
										<h3>Waste Generated</h3>
										<Dropdown>
											<Dropdown.Toggle>
												Filter
											</Dropdown.Toggle>
											<Dropdown.Menu>
												<Dropdown.Item
													onClick={(
														e: React.MouseEvent<
															HTMLElement,
															MouseEvent
														>
													) => {
														handleFilterButton(
															e,
															"waste/latest/7days",
															"7days"
														);
													}}
												>
													Latest
												</Dropdown.Item>
												<Dropdown.Item
													onClick={(
														e: React.MouseEvent<
															HTMLElement,
															MouseEvent
														>
													) => {
														handleFilterButton(
															e,
															"waste/latest/30days",
															"30days"
														);
													}}
												>
													Last 30 days
												</Dropdown.Item>
												<Dropdown.Item
													onClick={(
														e: React.MouseEvent<
															HTMLElement,
															MouseEvent
														>
													) => {
														handleFilterButton(
															e,
															"waste/latest/90days",
															"90days"
														);
													}}
												>
													Last 90 days
												</Dropdown.Item>
												<Dropdown.Item
													onClick={(
														e: React.MouseEvent<
															HTMLElement,
															MouseEvent
														>
													) => {
														handleFilterButton(
															e,
															"waste/latest/365days",
															"365days"
														);
													}}
												>
													Last 365 days
												</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
									</div>
									<div className="w-100 d-flex justify-content-between">
										<AdminChartCard
											maxHeight="100%"
											width="60%"
											header="Overall weight"
										>
											<WasteGenerated />
										</AdminChartCard>
										<AdminChartCard
											maxHeight="auto"
											width="38%"
											header="Waste composition"
										>
											<div className="w-50">
												<WasteComposition />
											</div>

											<div className="d-flex flex-column w-50 h-100 justify-content-between p-3 ">
												<div className="mt-2 py-2 border rounded d-flex flex-column bg-tertiary-red w-100 justify-content-center align-items-center px-4 fw-semibold">
													<div className="fs-5">
														Biodegradable
													</div>{" "}
													<div>
														{
															calculateTotal(
																wasteData
															)
																.total_biodegradable
														}{" "}
														kg
													</div>
												</div>
												<div className="mt-2 py-2 border rounded d-flex flex-column bg-tertiary-red w-100 justify-content-center align-items-center px-4 fw-semibold">
													<div className="fs-5">
														Residual
													</div>{" "}
													<div>
														{
															calculateTotal(
																wasteData
															).total_residual
														}{" "}
														kg
													</div>
												</div>
												<div className="mt-2 py-2 border rounded d-flex flex-column bg-tertiary-red w-100 justify-content-center align-items-center px-4 fw-semibold">
													<div className="fs-5">
														Recyclable
													</div>{" "}
													<div>
														{
															calculateTotal(
																wasteData
															).total_recyclable
														}{" "}
														kg
													</div>
												</div>
												<div className="mt-2 py-2 border rounded d-flex flex-column bg-tertiary-red w-100 justify-content-center align-items-center px-4 fw-semibold">
													<div className="fs-5">
														Infectious
													</div>{" "}
													<div>
														{
															calculateTotal(
																wasteData
															).total_infectious
														}{" "}
														kg
													</div>
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
								<section
									className="w-100"
									style={{ minHeight: "90px" }}
								></section>
							</div>
						</div>
					</div>
					{isPrinting && <DashboardPrint />}
				</div>
			)}
		</WasteDataContext.Provider>
	);
}

function Header({ handlePrint }: any) {
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
