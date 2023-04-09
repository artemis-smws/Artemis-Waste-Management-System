import Navbar from "../navbar";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

export default function LandingPage() {
  const style = {
    height: "100vh",
    width: "100vw",
    zIndex: "-1",
  };
  return (
    <>
      <Navbar />

      <Parallax pages={0} style={{ top: 0, left: 0 }} className="animation">
        <ParallaxLayer offset={0} speed={2.5}>
          <section
            style={style}
            className="d-flex align-items-center justify-content-evenly w-100"
            id="home"
          >
            <div className="artemis-logo"></div>
          </section>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={2.5}>
          <section
            style={style}
            className="d-flex align-items-center justify-content-evenly w-100"
          >
            <div className="artemis-logo"></div>
          </section>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={2.5}></ParallaxLayer>
        <ParallaxLayer offset={0} speed={2.5}></ParallaxLayer>
        <ParallaxLayer offset={0} speed={2.5}></ParallaxLayer>
      </Parallax>
    </>
  );
}
