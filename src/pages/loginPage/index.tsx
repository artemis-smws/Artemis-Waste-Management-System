import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getCookie, saveCookie } from "../../utils/cookies";
import auth from "../../services/firebase";
import { login } from "./data";

export default function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAuthenticate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
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
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    const cred = await signInWithPopup(auth, provider);
    console.log(cred);

    await saveCookie(cred);
    cred.user ? navigate("/dashboard") : navigate("/login");
  };

  return (
    <div className="w-screen h-screen bg-[url('/assets/img/bg-img.png')] bg-no-repeat bg-cover bg-center flex items-center justify-center overflow-y-auto overflow-x-hidden">
      <div className="w-full h-[650px] min-w-[360px] max-w-[1050px] m-[15px] grid grid-cols-1 md:grid-cols-[45%_1fr] rounded-[15px] shadow-[0px_0px_8px_rgba(0,0,0,0.547)] overflow-hidden bg-white">
        
        {/* Left Side */}
        <div className="bg-secondary p-[5%] md:p-[5%_10%] flex flex-col justify-center items-center text-white">
          <div className="w-full h-full gap-3 flex flex-col justify-center items-center">
            <img
              className="w-full h-auto max-w-[256px] my-6 cursor-pointer"
              src="./assets/logo/artemis-brand1.png"
              alt="artemis brand logo"
              onClick={() => navigate("/")}
            />
            <p className="text-center mb-4">Login using social media to get quick access</p>
            {login.auth_providers.map((data, idx) => (
              <button
                key={idx}
                className="w-full bg-light text-dark px-4 py-2 flex gap-3 items-center justify-center rounded-md font-medium transition-colors hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed max-h-[56px]"
                disabled={data.disable}
                onClick={handleGoogleAuthenticate}
              >
                <img
                  className="max-h-[32px] h-full w-auto"
                  src={data.imgUrl}
                  alt={data.name + " icon"}
                />
                Login with {data.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="bg-light p-[10%] flex flex-col justify-center items-center">
          <div className="h-auto w-full flex flex-col items-center gap-4">
            <h1 className="text-3xl font-bold m-0 text-center">Login to your account</h1>
            <p className="text-center text-gray-600">
              Don't have an account yet? <span className="font-medium text-tertiary cursor-pointer hover:underline">Sign up for Free!</span>
            </p>
            
            <form className="w-full flex flex-col gap-4 mt-4" onSubmit={handleAuthenticate}>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700" htmlFor="emailInput">Email address</label>
                <input 
                  id="emailInput"
                  type="email" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent transition-all"
                  placeholder="name@example.com" 
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700" htmlFor="passwordInput">Password</label>
                <input 
                  id="passwordInput"
                  type="password" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent transition-all"
                  placeholder="Password" 
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="w-full flex justify-between items-center text-sm mt-2">
                <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                  <input
                    className="w-4 h-4 text-tertiary rounded border-gray-300 focus:ring-tertiary"
                    type="checkbox"
                    name="remember_me"
                    id="remember_me"
                  />
                  Remember me
                </label>
                <span className="text-tertiary cursor-pointer hover:underline font-medium">Forget password?</span>
              </div>
              
              <button
                className="w-full bg-tertiary text-white py-3 px-4 rounded-lg font-medium hover:bg-secondary transition-colors mt-4 shadow-sm"
                type="submit"
              >
                Login with Email
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
