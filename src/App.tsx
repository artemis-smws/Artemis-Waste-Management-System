import "./App.scss";
import LandingPage from "./pages/client/landingPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, createContext } from "react";
import Admin from "./pages/admin/login";
import Maps from "./pages/admin/maps";
import Dashboard from "./pages/admin/dashboard";
import Bin from "./pages/admin/bin";
import { getCookie, saveCookie } from "./services/cookies";
import Auth from "./pages/admin/auth";
import DashboardPrint from "./pages/admin/dashboardPrint";


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
  const months_list = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'];
  const total_weights: any = [];
  const days_list: any = [];
  let overall_weight = 0;
  totalWeightLast7DaysJSON.forEach((doc: any) => {
    total_weights.push(doc.overall_weight);
    const timestamp = doc.createdAt;
    const milliseconds = timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1e6);
    const date = new Date(milliseconds)
    const day = date.getDate()
    const month = date.getMonth()
    days_list.push(`${months_list[month]} ${day}`);
  });
  total_weights.forEach((weight: any) => {
    overall_weight += weight;
  })
  localStorage.setItem("overall_weight", JSON.stringify(overall_weight));
  localStorage.setItem("total_weights", total_weights);
  localStorage.setItem("days_list", days_list);
  const latestDocData = await fetch(
    "https://us-central1-artemis-b18ae.cloudfunctions.net/server/waste/latest",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const latestDocDataJSON = await latestDocData.json();
  localStorage.setItem("today_weight", latestDocDataJSON[0].overall_weight);

  const totalWeightPerTypes = await fetch(
    "https://us-central1-artemis-b18ae.cloudfunctions.net/server/status/latest",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const totalWeightPerTypesJSON = await totalWeightPerTypes.json();
  console.log(totalWeightPerTypesJSON)
  localStorage.setItem("overall_food_waste", totalWeightPerTypesJSON[0].overall_food_waste_weight);
  localStorage.setItem("overall_residual_waste", totalWeightPerTypesJSON[0].overall_residual_weight)
  localStorage.setItem("overall_recyclable_waste", totalWeightPerTypesJSON[0].overall_recyclable_weight)
  
}
