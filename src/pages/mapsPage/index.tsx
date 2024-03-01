import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { mapContainer, tileLayer, TrashContainer } from "./maps";
import Sidebar from "../../components/layout/sidebar";
import SearchControl from "./search-location";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./index.scss";
import { useEffect, useState } from "react";
import Legend from "./showLegend";
import WasteGenerated from "../dashboardPage/components/wasteGenerated";
import useFetch from "../../hooks/useFetch";

enum TrashStatus {
	Full = "Trashbin Full",
	HalfFull = "Trashbin Half Full",
	NotFull = "Trashbin not Full",
}

type TrashContainerType = {
	type: string;
	organization: string;
	location: {
		latitude: number;
		longitude: number;
	};
	id: string;
	trashPercentage: number;
};

const sampleData : TrashContainerType[] = [
    {
        id : "artemis-ai-infectious",
        location : {
            latitude  : 13.78397,
            longitude : 121.07435
        },
        organization : "Batangas State University",
        trashPercentage : 12,
        type : "infectious"
    }
]

function setTrashbinStatus(trashPercentage: number): TrashStatus {
	if (trashPercentage >= 80) {
		return TrashStatus.Full;
	} else if (trashPercentage >= 50) {
		return TrashStatus.HalfFull;
	} else {
		return TrashStatus.NotFull;
	}
}

export default function Maps() {
	const [trashbin, setTrashbin] = useState<TrashContainerType[]>(sampleData);
	const [legend, showLegend] = useState(false);
	const handleToggleShow = () => {
		showLegend(true);
	};
	const handleHideLegend = () => {
		showLegend(false);
	};
	useEffect(() => {
        console.log("maps page")
		useFetch("trashbin", "trashbin")
			.then((data) => {
				setTrashbin(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className="d-flex">
			<Sidebar />
			<MapContainer
				center={[mapContainer.lat, mapContainer.lng]}
				zoom={mapContainer.zoom}
				scrollWheelZoom={mapContainer.scroll}
				zoomControl={mapContainer.zoomCtrl}
			>
				<SearchControl />
				<TileLayer
					maxNativeZoom={tileLayer.nativeZoom}
					maxZoom={tileLayer.maxZoom}
					url={tileLayer.url}
				/>

				{trashbin.map((data, idx) => (
					<Marker
						key={idx}
						position={[
							data.location.latitude,
							data.location.longitude
						]}
						icon={L.divIcon({
							className: "round-button",
							html: `<button type="button" id="green">${
								0 + "%"
							}</button>`,
						})}
					>
						<Popup>
							<div className="d-flex flex-column justify-content-center container-header w-100 p-3">
								<h3>Trashbin ID: {data.id || "n/a"}</h3>
                                <p>Location : {data.organization || "n/a"}</p>
                                <p>Percentage : {data.trashPercentage || "n/a"}</p>
                                <p>Status : {"Testing" || "n/a"}</p>
                                <p>Type : {data.type || "n/a"}</p>
							</div>
							<div id="trashbin-activity-chart">
								<WasteGenerated />
							</div>
						</Popup>
					</Marker>
				))}

				{legend && <Legend close={handleHideLegend} />}
				<button
					type="button"
					className="btn"
					id="legend"
					onClick={handleToggleShow}
				>
					Legend
				</button>
			</MapContainer>
		</div>
	);
}
