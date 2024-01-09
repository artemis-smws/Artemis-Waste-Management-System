import "./index.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getCookie, saveCookie } from "../../utils/cookies";
import auth from "../../services/firebase";
import { Card, FloatingLabel, Form } from "react-bootstrap";
import { login } from "./data";
import { ArrowLeft } from "react-bootstrap-icons";

export default function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAuthenticate = async () => {
    const cred = await fetch(
      "https://us-central1-artemis-b18ae.cloudfunctions.net/server/auth/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const credJSON = await cred.json();
    saveCookie(credJSON.user.uid);
    console.log(getCookie());
    credJSON.user ? navigate("/dashboard") : navigate("/login");
  };

  const handleGoogleAuthenticate = async () => {
    const provider = await new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    const cred = await signInWithPopup(auth, provider);
    console.log(cred);

    await saveCookie(cred);
    cred.user ? navigate("/dashboard") : navigate("/login");
  };

  return (
    <div id="admin-login">
      <Card>
        <div
          id="left"
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <div className="w-100 h-100 gap-3 d-flex flex-column justify-content-center align-items-center text-white">
            <img
              width="100%"
              height="auto"
              src="./assets/logo/artemis-brand1.png"
              alt="artemis brand logo"
              onClick={() => navigate("/")}
            />
            <p>Login using social media to get quick access</p>
            {login.auth_providers.map((data) => (
              <button
                className="w-100 btn px-3 py-0 d-flex gap-3 align-items-center"
                disabled={data.disable}
                // !TODO : Change later depending on the auth provider
                onClick={handleGoogleAuthenticate}
              >
                <img
                  style={{maxHeight : "32px"}}
                  height="100%"
                  width="auto"
                  src={data.imgUrl}
                  alt={data.name + "icon"}
                />
                Login with {data.name}
              </button>
            ))}
          </div>
        </div>

        <div
          id="right"
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <div className="h-auto w-100 d-flex flex-column align-items-center gap-3">
            <h1>Login to your account</h1>
            <p>
              Don't have an account yet? <span>Sign up for Free!</span>
            </p>
            <div className="w-100">
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)}/>
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
              </FloatingLabel>
            </div>

            <div className="w-100 h-auto d-flex  justify-content-between">
              <label>
                <input
                  className="me-2"
                  type="checkbox"
                  name="remember_me"
                  id="remember_me"
                />
                Remember me
              </label>
              <span>Forget password?</span>
            </div>
            <button
              className="btn w-100"
              type="submit"
              onClick={handleAuthenticate}
              name="submit"
            >
              Login with Email
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
