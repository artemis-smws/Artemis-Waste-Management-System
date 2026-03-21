
import LandingPage from "./pages/landingPage";
import { Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Admin from "./pages/loginPage";
import Maps from "./pages/mapsPage";
import Dashboard from "./pages/dashboardPage";
import Bin from "./pages/binPage";
import DashboardPrint from "./pages/dashboardPage/components/printDashboard";
import { lazy, Suspense } from "react";
const AddPage = lazy(() => import("./pages/addDataPage"));
import useFetch from "./hooks/useFetch";
import { TrashbinContext } from "./context/trashbinContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

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
		<AuthProvider>
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
								<Suspense fallback={<div className="flex h-screen w-full items-center justify-center bg-[#f1f1f1]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#216604]"></div></div>}>
									<AddPage />
								</Suspense>
							</ProtectedRoute>
						}
					/>
				</Routes>
			</TrashbinContext.Provider>
		</AuthProvider>
	)
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const { user, loading } = useAuth();

	if (loading) {
		return (
			<div className="flex h-screen w-full items-center justify-center bg-[#f1f1f1]">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#216604]"></div>
			</div>
		);
	}

	return user ? children : <Navigate to="/login" />;
}
