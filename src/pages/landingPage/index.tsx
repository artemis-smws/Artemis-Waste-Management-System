import "./index.scss";
import Navbar from "../../components/layout/navbar";
import { Parallax, ParallaxLayer, ParallaxProps } from "@react-spring/parallax";
import About from "./about";
import { useRef } from "react";
import Features from "./features";
import Contact from "./contact";
import Home from "./home";
import WebStatusOvelay from "../../components/webStatusOverlay";

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
      <Home />
      <About />
      <Features />
      <Contact />
    </>
  );
}
