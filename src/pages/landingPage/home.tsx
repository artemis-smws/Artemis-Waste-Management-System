import "./index.scss";
// import Navbar from "../../components/layout/navbar";
import { useRef } from "react";
import { home } from "./data";

export default function Home() {
  const ref: any = useRef();

  return (
    <>
      <div id="home-overlay"></div>
      <div id="home">
        <div>
          <div>
            <h1>{home.front_text}</h1>
            <button className="btn btn-primary">Contact Us</button>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}
