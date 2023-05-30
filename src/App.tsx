import "./App.scss";
import LandingPage from "./pages/client/landingPage";
import { Routes, Route } from "react-router-dom";
import Admin from "./pages/admin/login";
import Maps from "./pages/admin/maps";
import Navbar from "./components/layout/navbar";
import Dashboard from "./pages/admin/dashboard";
import Bin from "./pages/admin/bin";
import Auth from "./pages/admin/auth";


export function App() { 

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/maps" element={<Maps/>} />
        <Route path="*" element={<LandingPage/>} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/bin" element={<Bin/>}/>
        <Route path="/auth" element={<Auth/>}/>
      </Routes>
    </div>
  );
}