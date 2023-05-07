import "./App.scss";
import LandingPage from "./pages/client/landingPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Admin from "./pages/admin/admin";
import Maps from "./pages/admin/maps";



export function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />
    },
    {
      path: '/admin',
      element: <Admin/>
    },
    {
      path: '/maps',
      element: <Maps/>
    }
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}