import "./App.scss";
import LandingPage from "./pages/client/landingPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, createContext, useState } from "react";
import Admin from "./pages/admin/login";
import Maps from "./pages/admin/maps";
import Dashboard from "./pages/admin/dashboard";
import Bin from "./pages/admin/bin";
import { getCookie, saveCookie } from "./services/cookies";
import Auth from "./pages/admin/auth";
import DashboardPrint from "./pages/admin/dashboardPrint";
import { fetchData } from "./helpers/fetchData";


export function App() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
   fetchData()
    .then(() => {
      setLoaded(true)
    })
  }, [loaded]);
  return (
    <div>
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
          path="/auth"
          element={
            <ProtectedRoute>
              <Auth />
            </ProtectedRoute>
          }
        />
        <Route
          path="/print"
          element={
            <ProtectedRoute>
              <DashboardPrint/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

function ProtectedRoute({ children }: any) {
  const user = getCookie().trim().split("=")[1];
  return user != "" ? children : <Navigate to="/login" />;
}
