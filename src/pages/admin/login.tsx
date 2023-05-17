import "./admin.scss";
import { Parallax, ParallaxLayer, ParallaxProps } from "@react-spring/parallax";
import { useRef } from "react";
import {Link, useNavigate } from 'react-router-dom'

export default function Admin() {
  const layer: React.CSSProperties = {
    height: "1000px",
  };

  const styles: React.CSSProperties = {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  const navigate = useNavigate()
  const ref: any = useRef();
  return (
    <Parallax pages={1} style={{ top: "0", left: "0" }} ref={ref}>
      <ParallaxLayer offset={0} speed={0.25} factor={1} style={layer}>
        <div
          style={{
            ...styles,
            backgroundImage: "url(./assets/img/background.svg)",
          }}
          className="home_parallax_layer"
        />
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
      <ParallaxLayer offset={0} speed={0} style={layer}></ParallaxLayer>

      <div
        className="d-flex align-items-center justify-content-center w-100 h-100"
        id="admin-login"
      >
        <Link
          to='/'
          className="d-flex justify-content-center align-items-center"
          id="login-logo"
        >
          <img src="./assets/img/artemis-logo.png" />
        </Link>
        <div
          className="d-flex justify-content-center align-items-center"
          id="login-card"
          style={{zIndex: '10'}}
        >
          <div className="d-flex flex-column align-items-center justify-content-center">
            <input type="text" placeholder="Email" name="email" />
            <input type="password" placeholder="Password" name="password" />
            {/* change to authentication  */}
            <button onClick={() => {
              navigate('/maps')
            }} type="button" className="btn" id="lgn-btn">
              LOGIN
            </button>
          </div>
        </div>
      </div>

      <footer className="vw-100">
        <ul className="d-flex justify-content-evenly" id="f-lists">
          <li className="d-flex">
            <img className="me-1" src="./assets/img/bsu-logo.png" />
            <h1>Batangas State University</h1>
          </li>
          <li className="d-flex">
            <img className="me-1" src="./assets/img/bsu-logo.png" />
            <h1>BatState-U General Service Office</h1>
          </li>
          <li className="d-flex">
            <img className="me-1" src="./assets/img/emu_logo.png" />
            <h1>BatState-U Environmental Management Unit</h1>
          </li>
        </ul>
      </footer>
    </Parallax>
  );
}
