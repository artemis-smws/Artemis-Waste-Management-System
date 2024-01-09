import "./index.scss";
import { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../../services/firebase";
import { deleteCookie, getCookie } from "../../../utils/cookies";
import { HouseDoorFill } from "react-bootstrap-icons";
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
        className="d-flex flex-column align-items-center justify-content-between"
        id="Sidebar"
      >
        <div className="justify-content-center" id="Project-Logo">
          <Link
            to="/dashboard"
            className="d-flex align-items-center justify-content-center"
            reloadDocument
          >
            <img
              src="./assets/logo/artemis-brand1.png"
              width="90%"
              height="auto"
            />
          </Link>
        </div>

        <div
          className="d-flex flex-column justify-content-center align-items-center w-100"
          id="Lists"
        >
          <div id="sidebar-button-wrapper">
            {sidebar.sidebar_button.map((data) => (
              <Link
                key={data.name}
                to={data.route}
                className={"d-flex align-items-center justify-content-center btn w-100 m-0 py-3 px-4 text-white disabled-" + data.disable}
                reloadDocument
              >
                <div className="w-100 d-flex justify-content-start gap-4 px-3">
                  <img src={data.icon} alt={data.name + " icon"} />
                  {data.name}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <button type="button" onClick={handleSignOut} className="btn">
          SIGN OUT
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
