import "./landingPage.scss";
import Navbar from "../../components/layout/navbar";
import { Parallax, ParallaxLayer, ParallaxProps } from "@react-spring/parallax";
import About from "../../components/pages/about";
import { useRef } from "react";
import Features from "../../components/pages/features";
import Contact from "../../components/pages/contact";

export default function LandingPage() {
  const layer: React.CSSProperties = {
    height: "1000px",
  };
  const ref = useRef();
  return (
    <>
      {/* first page */}
      <Parallax pages={4} style={{ top: "0", left: "0" }}>
        <ParallaxLayer offset={0} speed={0.25} factor={1} style={layer}>
          <div id="background" className="home_parallax_layer" />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.3} factor={1} style={layer}>
          <div id="mountain" className="home_parallax_layer" />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={-0.1} factor={1} style={layer}>
          <div className="home_parallax_layer">
            <img
              src="./placeholder-icon.png"
              id="logo"
              style={{ marginBottom: "250px" }}
            />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.3} factor={1} style={layer}>
          <div id="jungle1" className="home_parallax_layer" />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.35} factor={1} style={layer}>
          <div id="jungle2" className="home_parallax_layer" />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.28} factor={1} style={layer}>
          <div id="jungle3" className="home_parallax_layer" />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.27} factor={1} style={layer}>
          <div id="jungle4" className="home_parallax_layer" />
        </ParallaxLayer>
        <ParallaxLayer offset={-0.25} speed={0} factor={1} style={layer}>
          <div id="jungle5" className="home_parallax_layer"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0} style={layer}>
          <Navbar />
        </ParallaxLayer>
        {/* second page */}
        <ParallaxLayer
          offset={1}
          speed={0}
          factor={3}
          style={{ height: "100%" }}
        >
          <About className="other_parallax_layer" />
          <Features className="other_parallax_layer" />
          <Contact className="other_parallax_layer" />
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
    backgroundColor: 'black',
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
