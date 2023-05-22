import "./admin.scss";
import { Parallax, ParallaxLayer, ParallaxProps } from "@react-spring/parallax";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import auth from "../../firebase/firebase";
import { handleSigninWithEmail } from "../../modules/handleAuthentication";

export default function Admin() {
  const layer: React.CSSProperties = {
    height: "1000px",
  };

  const styles: React.CSSProperties = {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isValid = (password.length > 7 && email.includes('@gmail.com')) ? true : false

  const handleAuthenticate = async () => {
    const response = await handleSigninWithEmail({
      email: email,
      password: password,
    });
    console.log(response)
    navigate('/dashboard')
  };

  const handleGoogleAuthenticate = async () => {
    const provider = await new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    await signInWithPopup(auth, provider);
    navigate('/dashboard')
  };

  const navigate = useNavigate();
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
          to="/"
          className="d-flex justify-content-center align-items-center"
          id="login-logo"
          style={{ zIndex: "10" }}
        >
          <img src="./assets/img/artemis-logo.png" />
        </Link>
        <div
          className="d-flex justify-content-center align-items-center"
          id="login-card"
          style={{ zIndex: "10" }}
        >
          <div className="d-flex flex-column align-items-center justify-content-center">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
              placeholder="Email"
              name="email"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              name="password"
            />
            {/* change to authentication  */}
            <button
              onClick={handleAuthenticate}
              type="button"
              className="btn"
              id="lgn-btn"
              disabled={(isValid)? false : true}
            >
              LOGIN
            </button>
            <button
              onClick={handleGoogleAuthenticate}
              className="btn bg-red mt-1 d-flex align-items-center"
            >
              <img
                height="35px"
                width="auto"
                src="./assets/img/google-icon.svg"
                alt="google icon"
              />
              <div className="ms-2">Signin with Google</div>
            </button>
          </div>
        </div>
      </div>

      <CustomFooter />
    </Parallax>
  );
}




function CustomFooter() {
  return (
    <footer className="vw-100" style={{maxHeight : '70px'}}>
      <ul className="d-flex justify-content-evenly w-100" id="f-lists">
        <li className="d-flex">
          <img className="me-1 w-auto" src="./assets/img/bsu-logo.png" />
          <h1>Batangas State University</h1>
        </li>
        <li className="d-flex">
          <img className="me-1 w-auto" src="./assets/img/bsu-logo.png" />
          <h1>BatState-U General Service Office</h1>
        </li>
        <li className="d-flex">
          <img className="me-1 w-auto" src="./assets/img/emu_logo.png" />
          <h1>BatState-U Environmental Management Unit</h1>
        </li>
      </ul>
    </footer>
  );
}
