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

      <Parallax pages={4} className="animation">
        <ParallaxLayer offset={0} speed={0.25}>
          <div id="background" className="animation_layer parallax" />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.3}>
          <div id="mountain" className="animation_layer parallax" />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={-0.1} className="animation_layer">
          <img src="./placeholder-icon.png" id="logoland"/>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.3}>
          <div id="jungle1" className="animation_layer parallax" />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.35}>
          <div id="jungle2" className="animation_layer parallax" />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.45}>
          <div id="jungle3" className="animation_layer parallax" />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.4}>
          <div id="jungle4" className="animation_layer parallax" />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.25}>
          <div id="jungle5" className="animation_layer parallax" />
        </ParallaxLayer>
        
      </Parallax>
    </>
  );
}
