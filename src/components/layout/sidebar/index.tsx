import { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../../services/firebase";
import { deleteCookie, getCookie } from "../../../utils/cookies";
import { sidebar } from "./data";

function Sidebar() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    auth.signOut();
    deleteCookie();
    navigate("/login");
  };

  return (
    <div>
      <div
        className="flex flex-col items-center justify-between bg-[#216604] m-0 h-screen min-w-[280px] max-w-[300px] py-8 px-2"
        id="Sidebar"
      >
        <div className="flex justify-center w-full" id="Project-Logo">
          <Link
            to="/dashboard"
            className="flex items-center justify-center no-underline w-full"
            reloadDocument
          >
            <img
              src="./assets/logo/artemis-brand1.png"
              className="w-[90%] h-auto"
              alt="Artemis Logo"
            />
          </Link>
        </div>

        <div
          className="flex flex-col justify-center items-center w-full mt-8 flex-1"
          id="Lists"
        >
          <div className="w-full flex flex-col gap-2">
            {sidebar.sidebar_button.map((data) => (
              <Link
                key={data.name}
                to={data.route}
                className={`flex items-center justify-center w-full m-0 py-3 px-4 text-white text-lg font-light no-underline hover:bg-[#A21111] transition-colors rounded-md ${
                  data.disable ? "hidden" : ""
                }`}
                reloadDocument
              >
                <div className="w-full flex items-center justify-start gap-4 px-3">
                  <img height="16px" src={data.icon} alt={data.name + " icon"} />
                  {data.name}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="w-full py-3 px-4 bg-[#A21111] text-white rounded-md font-medium hover:bg-red-800 transition-colors border-none"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
