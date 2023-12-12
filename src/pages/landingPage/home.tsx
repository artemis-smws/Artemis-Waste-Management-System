import "./index.scss";
// import Navbar from "../../components/layout/navbar";
import { useRef } from "react";

export default function Home() {
  const style : React.CSSProperties = {
    backgroundImage: "url(./assets/img/bg-img.png)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  }
  const ref: any = useRef();

  return (
    <>
      {/* <Navbar
        handleFeature={() => location.href = '#features'}
        handleAbout={() => location.href = '#about'}
        handleContact={() => location.href = '#contacts'}
      /> */}
        <div className="vw-100 vh-100 d-flex justify-content-center align-items-center" style={style}>
          <img src="./assets/img/artemis-logo.png" alt="artemis logo" />
        </div>
    </>
  );
}


