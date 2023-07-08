import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// CSS
import "bootstrap/dist/css/bootstrap.css";
// Components
import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    
    <BrowserRouter>
      <App />
    </BrowserRouter>
    
);
