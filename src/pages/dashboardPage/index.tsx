import "./index.scss";
import WasteGenerated from "./components/wasteGenerated";
import PercentagePerCampus from "./components/percentagePerCampus";
import Sidebar from "../../components/layout/sidebar";
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
import LoadingPage from "../../components/loadingPage";
import { WasteDataContext } from "../../context/wasteDataContext";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { BsPrinter } from "react-icons/bs";
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
		event: any,
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
					<div className="flex">
						<div className="hide-dashboard">
							<Sidebar />
						</div>
						<div className="w-screen h-screen overflow-hidden hide-dashboard">
							<Header handlePrint={handlePrint} />
							<div
								className="h-full w-full flex flex-col items-center px-6 py-6 border-l border-gray-200 overflow-y-auto bg-gray-50"
							>
								{/* section 0 */}
								<OverviewCard />
								{/* chart row 1 */}
								<section className="flex w-full flex-col">
									<div className="w-full my-4 flex justify-between items-center">
										<h3 className="text-2xl font-semibold">Waste Generated</h3>
										<DropdownMenu.Root>
											<DropdownMenu.Trigger asChild>
												<button className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-tertiary">
													Filter
												</button>
											</DropdownMenu.Trigger>
											<DropdownMenu.Portal>
												<DropdownMenu.Content className="min-w-[150px] bg-white rounded-md shadow-lg border border-gray-200 p-1 z-50">
													<DropdownMenu.Item
														className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 rounded flex outline-none"
														onClick={(e) => handleFilterButton(e, "waste/latest/7days", "7days")}
													>
														Latest
													</DropdownMenu.Item>
													<DropdownMenu.Item
														className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 rounded flex outline-none"
														onClick={(e) => handleFilterButton(e, "waste/latest/30days", "30days")}
													>
														Last 30 days
													</DropdownMenu.Item>
													<DropdownMenu.Item
														className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 rounded flex outline-none"
														onClick={(e) => handleFilterButton(e, "waste/latest/90days", "90days")}
													>
														Last 90 days
													</DropdownMenu.Item>
													<DropdownMenu.Item
														className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 rounded flex outline-none"
														onClick={(e) => handleFilterButton(e, "waste/latest/365days", "365days")}
													>
														Last 365 days
													</DropdownMenu.Item>
												</DropdownMenu.Content>
											</DropdownMenu.Portal>
										</DropdownMenu.Root>
									</div>
									<div className="w-full flex justify-between gap-4">
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
											<div className="w-1/2">
												<WasteComposition />
											</div>

											<div className="flex flex-col w-1/2 h-full justify-between p-4">
												<div className="mt-2 py-2 border border-gray-200 rounded-md flex flex-col bg-red-50 text-emerald-900 w-full justify-center items-center px-4 font-semibold">
													<div className="text-lg">Biodegradable</div>
													<div>{calculateTotal(wasteData).total_biodegradable} kg</div>
												</div>
												<div className="mt-2 py-2 border border-gray-200 rounded-md flex flex-col bg-red-50 text-emerald-900 w-full justify-center items-center px-4 font-semibold">
													<div className="text-lg">Residual</div>
													<div>{calculateTotal(wasteData).total_residual} kg</div>
												</div>
												<div className="mt-2 py-2 border border-gray-200 rounded-md flex flex-col bg-red-50 text-emerald-900 w-full justify-center items-center px-4 font-semibold">
													<div className="text-lg">Recyclable</div>
													<div>{calculateTotal(wasteData).total_recyclable} kg</div>
												</div>
												<div className="mt-2 py-2 border border-gray-200 rounded-md flex flex-col bg-red-50 text-emerald-900 w-full justify-center items-center px-4 font-semibold">
													<div className="text-lg">Infectious</div>
													<div>{calculateTotal(wasteData).total_infectious} kg</div>
												</div>
											</div>
										</AdminChartCard>
									</div>
								</section>
								{/* chart row 2 */}
								{/* chart row 3 */}
								<section className="w-full flex justify-between mt-10">
									<AdminChartCard
										width="100%"
										header="Waste generation per building"
										maxHeight="450px"
									>
										<WasteGenerationBuilding />
									</AdminChartCard>
								</section>
								<section className="w-full min-h-[90px]"></section>
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
		<div className="flex border-b-2 border-gray-200 shadow-sm items-center justify-between pl-6 py-4 bg-white">
			<p className="m-0 font-bold text-2xl">Dashboard</p>
			{/* Call handlePrint function onClick */}
			<button
				type="button"
				className="flex mx-4 items-center gap-2 bg-white border border-gray-300 shadow-sm rounded-full px-4 py-2 font-medium hover:bg-gray-50 transition-colors"
				onClick={handlePrint}
			>
				<BsPrinter />
				Print
			</button>
		</div>
	);
}
