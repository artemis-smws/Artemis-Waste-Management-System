import "./landingPage.scss";
import Navbar from "../../components/layout/navbar";
import { Parallax, ParallaxLayer, ParallaxProps } from "@react-spring/parallax";
import About from "./about";
import { useRef } from "react";
import Features from "./features";
import Contact from "./contact";
import NewFeatures from "./newFeatures";

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
      {/* first page */}
      <Parallax pages={4} style={{ top: "0", left: "0" }} ref={ref}>
        <ParallaxLayer offset={0} speed={0.25} factor={1} style={layer}>
          <div
            style={{
              ...styles,
              backgroundImage: "url(./assets/img/background.svg)",
            }}
            className="home_parallax_layer"
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={-0.1} factor={1} style={layer}>
          <div className="home_parallax_layer">
            <img
              src="./assets/img/placeholder-icon.png"
              id="logo"
              style={{ marginBottom: "250px" }}
            />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.3} factor={1} style={layer}>
          <div
            style={{
              ...styles,
              backgroundImage: "url(./assets/img/jungle1.webp)",
            }}
            className="home_parallax_layer"
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.35} factor={1} style={layer}>
          <div
            style={{
              ...styles,
              backgroundImage: "url(./assets/img/jungle2.webp)",
            }}
            className="home_parallax_layer"
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.28} factor={1} style={layer}>
          <div
            style={{
              ...styles,
              backgroundImage: "url(./assets/img/jungle3.webp)",
            }}
            className="home_parallax_layer"
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.27} factor={1} style={layer}>
          <div
            style={{
              ...styles,
              backgroundImage: "url(./assets/img/jungle4.webp)",
            }}
            className="home_parallax_layer"
          />
        </ParallaxLayer>
        <ParallaxLayer offset={-0.25} speed={0} factor={1} style={layer}>
          <div
            style={{
              ...styles,
              backgroundImage: "url(./assets/img/jungle5.webp)",
            }}
            className="home_parallax_layer"
          ></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0} style={layer}>
          <Navbar
            handleFeature={() => ref.current.scrollTo(2)}
            handleAbout={() => ref.current.scrollTo(1)}
            handleContact={() => ref.current.scrollTo(3)}
          />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0}>
          <About className="other_parallax_layer" />
        </ParallaxLayer>
        <ParallaxLayer offset={2} speed={0}>
          <Features className="other_parallax_layer" />
        </ParallaxLayer>
        <ParallaxLayer offset={3} speed={0}>
          <Contact className="other_parallax_layer" />
        </ParallaxLayer>
      </Parallax>
    </>
  );
}
