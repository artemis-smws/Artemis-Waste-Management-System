import "./App.scss";
import LandingPage from "./pages/client/landingPage";
import { Routes, Route, Navigate } from "react-router-dom";
import Admin from "./pages/admin/login";
import Maps from "./pages/admin/maps";
import Dashboard from "./pages/admin/dashboard";
import Bin from "./pages/admin/bin";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./firebase/firebase";
import { createContext, useContext } from "react";
import { getCookie, saveCookie } from "./services/cookies";

export function App() {
  console.log({cookies : getCookie()});
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
            <ProtectedRoute >
              <Maps />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bin"
          element={
            <ProtectedRoute >
              <Bin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

function ProtectedRoute({ children }: any) {
  const user = getCookie().trim().split('=')[1];
  console.log(user)
  return user != '' ? children : <Navigate to="/login" />;
}
