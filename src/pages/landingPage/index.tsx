import "./index.scss";
import About from "./about";
import { useRef } from "react";
import Features from "./features";
import Contact from "./contact";
import Home from "./home";
import Navbar_ from "../../components/layout/navbar";

export default function LandingPage() {
  const layer: React.CSSProperties = {
    height: "1000px",
  };

  const styles: React.CSSProperties = {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  const ref: any = useRef();

  return (
    <>
      <Navbar_ />
      <Home />
      {/* <About />
      <Features />
      <Contact /> */}
    </>
  );
}