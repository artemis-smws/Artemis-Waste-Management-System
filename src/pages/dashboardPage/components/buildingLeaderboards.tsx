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
    <div className="w-full h-full p-3 overflow-y-auto">
      <ul className="flex flex-col border border-gray-200 rounded-md bg-white shadow-sm overflow-hidden m-0 p-0">
        {building.map((building, index) => {
          return index >= 0 && index < 3 ? (
            <li key={building} className="flex justify-between items-center px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">
              <img width="30px" src={rankBadgeUrl[index]} alt="rank badges" />
              <div className="font-bold text-gray-800">{building}</div>
              <div className="text-gray-600">{buildingData[index]}</div>
            </li>
          ) : (
            <li key={building} className="flex justify-between items-center px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">
              <div
                className="flex justify-center font-semibold text-gray-500"
                style={{ width: "30px" }}
              >
                {index + 1}
              </div>
              <div className="font-bold text-gray-800">{building}</div>
              <div className="text-gray-600">{buildingData[index]}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
