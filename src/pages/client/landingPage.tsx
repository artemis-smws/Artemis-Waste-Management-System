import "./landingPage.scss";
import Navbar from "../../components/layout/navbar";
import { Parallax, ParallaxLayer, ParallaxProps } from "@react-spring/parallax";
import About from "../../components/pages/about";
import { useRef } from "react";
import Features from "../../components/pages/features";

export default function LandingPage() {
  const ref = useRef();
  return (
    <>
      <Navbar />
      {/* first page */}
      <Parallax pages={4} className="animation position-absolute">
        <ParallaxLayer offset={0} speed={0.25}>
          <div id="background" className="animation_layer" />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.3}>
          <div id="mountain" className="animation_layer" />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={-0.1} className="animation_layer">
          <img src="./placeholder-icon.png" id="logoland" />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.3}>
          <div id="jungle1" className="animation_layer" />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.35}>
          <div id="jungle2" className="animation_layer" />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.28}>
          <div id="jungle3" className="animation_layer" />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.27}>
          <div id="jungle4" className="animation_layer" />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.25}>
          <div id="jungle5" className="animation_layer"></div>
        </ParallaxLayer>

        {/* second page */}
        <ParallaxLayer style={{height: '100vh'}} offset={1} speed={0.25}>
          <About className="animation_layer my-5" />
        </ParallaxLayer>
        <ParallaxLayer style={{height: '100vh'}} offset={2} speed={0.25}>
          <Features className="animation_layer" />
        </ParallaxLayer>
      </Parallax>
    </>
  );
}

const Footer = () => {
  const style: React.CSSProperties = {
    width: "100%",
    height: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    color: "grey",
  };
  return (
    <div style={style}>
      <img src="./bsu_logo.png" alt="batangas state university logo" />
      <p>Batangas State University</p>
      <p>BatStateU General Service Office</p>
      <img src="./emu_logo.png" alt="EMU Logo" />
      <p>BatStateU Environmental Management Unit</p>
    </div>
  );
};
