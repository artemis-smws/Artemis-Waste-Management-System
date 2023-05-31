import { useState } from "react";

export function BuildingLeaderboards() {
  const [building, setBuilding] = useState([
    "Gymnasium",
    "CEAFA Building",
    "CIT Building",
    "CICS Building",
    "SSC Building",
    "STEER Hub",
    "RGR Building",
  ]);
  const rankBadgeUrl = [
    "./assets/img/1st_place_icon.png",
    "./assets/img/2nd_place_icon.png",
    "./assets/img/3rd_place_icon.png",
  ]
  return (
    <body className="w-100 h-100 p-3" style={{ overflowY: "scroll" }}>
      <ol className="list-group list-group-flushed">
        {building.map((building, index) => {
          return (
            (index >= 0 && index < 3) ?
            <ul className="list-group-item d-flex justify-content-between align-items-center">
                <img width='30px' src={rankBadgeUrl[index]} alt="rank badges" />
                <div className="fw-bold">{building}</div>
                <div>10kg</div>
            </ul>
            :
            <ul className="list-group-item d-flex justify-content-between align-items-center">
              <div className="d-flex justify-content-center" style={{width : '30px'}}>{index + 1}</div>
              <div className="fw-bold">{building}</div>
              <div>14kg</div>
            </ul>
          );
        })}
      </ol>
    </body>
  );
}
