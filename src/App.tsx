import "./App.scss";
import LandingPage from "./pages/landingPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, createContext, useState } from "react";
import Admin from "./pages/loginPage";
import Maps from "./pages/mapsPage";
import Dashboard from "./pages/dashboardPage";
import Bin from "./pages/binPage";
import { getCookie, saveCookie } from "./utils/cookies";
import DashboardPrint from "./pages/dashboardPage/components/printDashboard";
import AddPage from "./pages/addDataPage";
import useFetch from "./hooks/useFetch";
import { TrashbinContext } from "./context/trashbinContext";

export function App() {
	const [trashbinData, setTrashbinData] : any = useState()
	useEffect(() => {
    useFetch("trashbin", "trashbin")
		.then((data : any) => {
			setTrashbinData(data)
		})
		.catch((e: any) => {
			if(e instanceof Error) {
				console.log(e.message)
			}
			console.log(e)
		})
  }, [])
	return (
		<TrashbinContext.Provider value={trashbinData}>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/login" element={<Admin />} />
				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/maps"
					element={
						<ProtectedRoute>
							<Maps />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/bin"
					element={
						<ProtectedRoute>
							<Bin />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/print"
					element={
						<ProtectedRoute>
							<DashboardPrint />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/data"
					element={
						<ProtectedRoute>
							<AddPage />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</TrashbinContext.Provider>
	)
}

function ProtectedRoute({ children }: any) {
	const user = getCookie().trim().split("=")[1];
	return user != "" || null ? children : <Navigate to="/login" />;
}
