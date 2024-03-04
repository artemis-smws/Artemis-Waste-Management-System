import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { mapContainer, tileLayer, TrashContainer } from "./maps";
import Sidebar from "../../components/layout/sidebar";
import SearchControl from "./search-location";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./index.scss";
import { useContext, useEffect, useState } from "react";
import Legend from "./showLegend";
import WasteGenerated from "../dashboardPage/components/wasteGenerated";
import useFetch from "../../hooks/useFetch";
import {
	TrashContainerType,
	TrashbinContext,
} from "../../context/trashbinContext";

enum TrashStatus {
	Full = "Trashbin Full",
	HalfFull = "Trashbin Half Full",
	NotFull = "Trashbin not Full",
}

function setTrashbinStatus(trashPercentage: number): TrashStatus {
	if (trashPercentage >= 80) {
		return TrashStatus.Full;
	} else if (trashPercentage >= 50) {
		return TrashStatus.HalfFull;
	} else {
		return TrashStatus.NotFull;
	}
}

function setColorStatus(status: TrashStatus) {
	if (status == TrashStatus.Full) {
		return "red";
	}
	if (status == TrashStatus.HalfFull) {
		return "yellow";
	} else {
		return "green";
	}
}

export default function Maps() {
	const trashbinData = useContext(TrashbinContext);
	const [trashbin, setTrashbin] = useState<TrashContainerType[]>();
	const [legend, showLegend] = useState(false);
	const handleToggleShow = () => {
		showLegend(true);
	};
	const handleHideLegend = () => {
		showLegend(false);
	};
	useEffect(() => {
		if (Array.isArray(trashbinData)) {
			setTrashbin(trashbinData)
		}
	}, [trashbinData]);

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

				{trashbin &&
					trashbin.map((data, idx) => (
						<Marker
							key={idx}
							position={[
								data.location.latitude,
								data.location.longitude,
							]}
							icon={L.divIcon({
								className: "round-button",
								html: `<button type="button" id="${setColorStatus(
									setTrashbinStatus(data.capacity)
								)}"}>${data.capacity + "%"}</button>`,
							})}
						>
							<Popup>
								<div className="d-flex flex-column justify-content-center container-header w-100 p-3">
									<h3>Trashbin ID: {data.id || "n/a"}</h3>
									<p>
										Location : {data.organization || "n/a"}
									</p>
									<p>Percentage : {data.capacity || "n/a"}</p>
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
