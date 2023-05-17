import "./App.scss";
import LandingPage from "./pages/client/landingPage";
import { Routes, Route } from "react-router-dom";
import Admin from "./pages/admin/login";
import Maps from "./pages/admin/maps";
import Navbar from "./components/layout/navbar";


export function App() { 

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/maps" element={<Maps/>} />
        <Route path="*" element={<LandingPage/>} />
      </Routes>
    </div>
  );
}