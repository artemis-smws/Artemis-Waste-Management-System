import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import DropdownSelectDate from "../../components/layout/dropdownDate";
import SelectSchool from "../../components/layout/selectSchool";
import WasteGenerated from "../../components/charts/wasteGenerated";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { Link } from "react-router-dom";

// Define a custom icon for the marker
const customIcon = L.divIcon({
  className: "round-button",
  html: '<button type="button" className="btn" id="trash-status">60%</button>',
});
const customIcon1 = L.divIcon({
  className: "round-button",
  html: '<button type="button" className="btn" id="trash-status1">20%</button>',
});
const customIcon2 = L.divIcon({
  className: "round-button",
  html: '<button type="button" className="btn" id="trash-status2">90%</button>',
});

export default function Maps() {
  function myFunction(): void {
    const popup = document.getElementById("myPopup");
    if (popup) {
      popup.classList.toggle("show");
    }
  }

  return (
    <div>
      <MapContainer
        center={[13.78428, 121.0743]}
        zoom={19}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <div className="navbar" id="maps-navbar">
          <Link to="/dashboard">
            <img
              src="./assets/img/artemis-favicon.webp"
              width="45px"
              height="44px"
            />
          </Link>
          <div
            className="d-flex justify-content-around align-items-center"
            id="map-navbar-list"
          >
            <Link to="/dashboard" className="nav-link mx-2">
              Dashboard
            </Link>
            <Link to="/bin" className="nav-link mx-2">
              Bin
            </Link>

            <SearchControl />
          </div>
        </div>
        <TileLayer
          maxNativeZoom={19}
          maxZoom={20}
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[13.78409, 121.07486]} icon={customIcon}>
          <Popup>
            <Popup className="custom-popup">
              <div id="popup-content">
                <div className="d-flex justify-content-between">
                  <div id="trashbin-id">
                    <h1>Trash bin:</h1>
                    <h1>2123</h1>
                  </div>
                  <div id="trashbin-location">
                    <h1>Canteen - Near Door</h1>
                    <h1>X: 13 Y: 121</h1>
                  </div>
                </div>
                <div
                  className="d-flex justify-content-around"
                  id="trash-weight"
                >
                  <div className="d-flex align-items-center">
                    <button
                      type="button"
                      className="btn d-flex justify-content-center align-items-center"
                      id="trash-status"
                    >
                      60%
                    </button>
                    <h1
                      style={{
                        fontFamily: "Inria Sans",
                        fontSize: "16px",
                        margin: "0",
                      }}
                    >
                      Trashbin almost full
                    </h1>
                  </div>
                  <div className="d-flex align-items-center">
                    <img
                      src="./assets/img/weight.png"
                      width="30px"
                      height="30px"
                    />
                    <h1
                      style={{
                        fontFamily: "Inria Sans",
                        fontSize: "16px",
                        margin: "0",
                      }}
                    >
                      (weight) 64kg
                    </h1>
                  </div>
                </div>

                <div id="trashbin-activity">
                  <div>
                    <h1>Trashbin Activity</h1>
                  </div>
                  <div className="d-flex justify-content-center">
                    <div id="trashbin-activity-chart">
                      <WasteGenerated />
                    </div>
                  </div>
                </div>
              </div>
            </Popup>
          </Popup>
        </Marker>
        <Marker position={[13.78428, 121.0743]} icon={customIcon1}>
          <Popup>
            <Popup className="custom-popup">
              <div id="popup-content">
                <div className="d-flex justify-content-between">
                  <div id="trashbin-id">
                    <h1>Trash bin:</h1>
                    <h1>2120</h1>
                  </div>
                  <div id="trashbin-location">
                    <h1>Gym - Near Entrance</h1>
                    <h1>X: 13 x Y: 121</h1>
                  </div>
                </div>
                <div
                  className="d-flex justify-content-around"
                  id="trash-weight"
                >
                  <div className="d-flex align-items-center">
                    <button
                      type="button"
                      className="btn d-flex justify-content-center align-items-center"
                      id="trash-status1"
                    >
                      20%
                    </button>
                    <h1
                      style={{
                        fontFamily: "Inria Sans",
                        fontSize: "16px",
                        margin: "0",
                      }}
                    >
                      Trashbin not full
                    </h1>
                  </div>
                  <div className="d-flex align-items-center">
                    <img
                      src="./assets/img/weight.png"
                      width="30px"
                      height="30px"
                    />
                    <h1
                      style={{
                        fontFamily: "Inria Sans",
                        fontSize: "16px",
                        margin: "0",
                      }}
                    >
                      (weight) 24kg
                    </h1>
                  </div>
                </div>

                <div id="trashbin-activity">
                  <div>
                    <h1>Trashbin Activity</h1>
                  </div>
                  <div className="d-flex justify-content-center">
                    <div id="trashbin-activity-chart">
                      <WasteGenerated />
                    </div>
                  </div>
                </div>
              </div>
            </Popup>
          </Popup>
        </Marker>
        <Marker position={[13.78501, 121.07378]} icon={customIcon2}>
          <Popup>
            <Popup className="custom-popup">
              <div id="popup-content">
                <div className="d-flex justify-content-between">
                  <div id="trashbin-id">
                    <h1>Trash bin:</h1>
                    <h1>2125</h1>
                  </div>
                  <div id="trashbin-location">
                    <h1>CIT Building - Near Entrance</h1>
                    <h1>X: 13 Y: 121 </h1>
                  </div>
                </div>
                <div
                  className="d-flex justify-content-around"
                  id="trash-weight"
                >
                  <div className="d-flex align-items-center">
                    <button
                      type="button"
                      className="btn d-flex justify-content-center align-items-center"
                      id="trash-status2"
                    >
                      90%
                    </button>
                    <h1
                      style={{
                        fontFamily: "Inria Sans",
                        fontSize: "16px",
                        margin: "0",
                      }}
                    >
                      Trashbin almost full
                    </h1>
                  </div>
                  <div className="d-flex align-items-center">
                    <img
                      src="./assets/img/weight.png"
                      width="30px"
                      height="30px"
                    />
                    <h1
                      style={{
                        fontFamily: "Inria Sans",
                        fontSize: "16px",
                        margin: "0",
                      }}
                    >
                      (weight) 90kg
                    </h1>
                  </div>
                </div>

                <div id="trashbin-activity">
                  <div>
                    <h1>Trashbin Activity</h1>
                  </div>
                  <div className="d-flex justify-content-center">
                    <div id="trashbin-activity-chart">
                      <WasteGenerated />
                    </div>
                  </div>
                </div>
              </div>
            </Popup>
          </Popup>
        </Marker>
        <button type="button" className="btn" id="legend" onClick={myFunction}>
          Legend
          <span className="popuptext" id="myPopup">
            <div
              className="d-flex justify-content-center"
              id="trash-percentage"
            >
              <div
                className="d-flex justify-content-center align-items-center"
                id="t-percentage"
                style={{ backgroundColor: "green" }}
              >
                <h1>0-30%</h1>
              </div>
              <div
                className="d-flex justify-content-center align-items-center"
                id="t-percentage"
                style={{ backgroundColor: "yellow" }}
              >
                <h1>31%-60%</h1>
              </div>
              <div
                className="d-flex justify-content-center align-items-center"
                id="t-percentage"
                style={{ backgroundColor: "$primary-red" }}
              >
                <h1>61%-100%</h1>
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <SelectSchool />
            </div>
            <div className="d-flex">
              <DropdownSelectDate />
            </div>
          </span>
        </button>
      </MapContainer>
    </div>
  );
}

function SearchControl() {
  const map = useMap();

  const provider = new OpenStreetMapProvider();

  const handleSearch = async (query: any) => {
    const results = await provider.search({ query });
    if (results.length > 0) {
      const { x, y } = results[0];
      map.flyTo([y, x], 19);
    }
  };
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchQueryChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(event: any) => {
          setSearchQuery(event.target.value);
        }}
        id="search-location"
      />
      <button
        type="button"
        className="btn btn-light"
        id="search-button"
        onClick={() => handleSearch(searchQuery)}
      >
        Search
      </button>
    </div>
  );
}
