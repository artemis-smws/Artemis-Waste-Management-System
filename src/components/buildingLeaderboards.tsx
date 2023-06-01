import { useEffect, useState } from "react";

export function BuildingLeaderboards() {
  const [building, setBuilding] = useState<any[]>([]);
  const [buildingData, setbuildingData] = useState<any[]>([]);
  const rankBadgeUrl = [
    "./assets/img/1st_place_icon.png",
    "./assets/img/2nd_place_icon.png",
    "./assets/img/3rd_place_icon.png",
  ];

  useEffect(() => {
    const { buildingDataObj } = localStorage;
    const buildingData = JSON.parse(buildingDataObj);
    const keys = Object.keys(buildingData);
    const values = Object.values(buildingData);
    values.sort();
    for (let i = 0; i < keys.length; i++) {
      setbuildingData((prev) => [...prev, values[i]]);
      setBuilding((prev) => [...prev, keys[i]]);
    }
  }, []);
  return (
    <body className="w-100 h-100 p-3" style={{ overflowY: "scroll" }}>
      <ol className="list-group list-group-flushed">
        {building.map((building, index) => {
          return index >= 0 && index < 3 ? (
            <ul className="list-group-item d-flex justify-content-between align-items-center">
              <img width="30px" src={rankBadgeUrl[index]} alt="rank badges" />
              <div className="fw-bold">{building}</div>
              <div>{buildingData[index]}</div>
            </ul>
          ) : (
            <ul className="list-group-item d-flex justify-content-between align-items-center">
              <div
                className="d-flex justify-content-center"
                style={{ width: "30px" }}
              >
                {index + 1}
              </div>
              <div className="fw-bold">{building}</div>
              <div>{buildingData[index]}</div>
            </ul>
          );
        })}
      </ol>
    </body>
  );
}
