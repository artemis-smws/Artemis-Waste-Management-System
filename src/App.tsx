import "./App.scss";
import LandingPage from "./pages/client/landingPage";
import Navbar from "./components/layout/navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/layout/sidebar";
import Admin from "./admin";

export function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
