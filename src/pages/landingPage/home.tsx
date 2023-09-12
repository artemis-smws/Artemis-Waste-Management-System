import "./index.scss";
import Navbar from "../../components/layout/navbar";
import { Parallax, ParallaxLayer, ParallaxProps } from "@react-spring/parallax";
import { useRef } from "react";
import WebStatusOvelay from "../../components/webStatusOverlay";

export default function LandingPage() {
  const style : React.CSSProperties = {
    backgroundImage: "url(./assets/img/bg-img.png)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  }
  const ref: any = useRef();

  return (
    <>
      <Navbar
        handleFeature={() => ref.current.scrollTo(2)}
        handleAbout={() => ref.current.scrollTo(1)}
        handleContact={() => ref.current.scrollTo(3)}
      />
        <div className="vw-100 vh-100" style={style}>

        </div>
    </>
  );
}
