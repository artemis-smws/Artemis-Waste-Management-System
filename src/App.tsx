import "./App.scss";
import LandingPage from "./pages/client/landingPage";
import Navbar from "./components/layout/navbar";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Sidebar from "./components/layout/sidebar";
import Admin from "./pages/admin/admin";


export function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />
    },
    {
      path: '/admin',
      element: <Admin />
    }
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}