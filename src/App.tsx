import "./App.scss";
import LandingPage from "./pages/client/landingPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Admin from "./pages/admin/login";
import Maps from "./pages/admin/maps";
import Dashboard from "./pages/admin/dashboard";
import Bin from "./pages/admin/bin";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./firebase/firebase";
import { createContext, useContext } from "react";
import { getCookie, saveCookie } from "./services/cookies";

export function App() {
  useEffect(() => {
    fetchData();
  }, []);
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
      </Routes>
    </div>
  );
}

function ProtectedRoute({ children }: any) {
  const user = getCookie().trim().split("=")[1];
  return user != "" ? children : <Navigate to="/login" />;
}

async function fetchData() {
  const highestData: any = await fetch(
    "https://us-central1-artemis-b18ae.cloudfunctions.net/server/waste/highest",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const highestDataJSON = await highestData.json();
  localStorage.setItem("highest_weight", highestDataJSON[0].overall_weight);
  const date = new Date(highestDataJSON[0].createdAt.seconds * 1000)
    .toUTCString()
    .slice(5, 11);
  localStorage.setItem("highest_day", date);

  const lowestData: any = await fetch(
    "https://us-central1-artemis-b18ae.cloudfunctions.net/server/waste/lowest",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const lowestDataJSON = await lowestData.json();
  localStorage.setItem("lowest_weight", lowestDataJSON[0].overall_weight);
  const date1 = new Date(lowestDataJSON[0].createdAt.seconds * 1000)
    .toUTCString()
    .slice(5, 11);
  localStorage.setItem("lowest_day", date1);

  const averageData = await fetch(
    "https://us-central1-artemis-b18ae.cloudfunctions.net/server/status/monthly/latest",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const averageDataJSON = await averageData.json();
  localStorage.setItem("average", averageDataJSON[0].average.toFixed(2));

  const totalWeightLast7Days = await fetch(
    "https://us-central1-artemis-b18ae.cloudfunctions.net/server/waste/latest/7days",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const totalWeightLast7DaysJSON = await totalWeightLast7Days.json();
  const total_weights : any = []
  const days_list : any = []
  totalWeightLast7DaysJSON.forEach((doc : any) => {
    total_weights.push(doc.overall_weight)
    const date = new Date(doc.createdAt.seconds * 1000)
      .toUTCString()
      .slice(5, 11);
    days_list.push(date)
  })
  localStorage.setItem("total_weights", total_weights);
  localStorage.setItem("days_list", days_list);
  const latestDocData =  await fetch(
    "https://us-central1-artemis-b18ae.cloudfunctions.net/server/waste/latest", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
  const latestDocDataJSON = await latestDocData.json()
  localStorage.setItem("today_weight", latestDocDataJSON[0].overall_weight)

}
