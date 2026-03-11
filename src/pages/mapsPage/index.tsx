import { useContext, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { mapContainer, tileLayer } from "./maps";
import Sidebar from "../../components/layout/sidebar";
import SearchControl from "./search-location";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./maps.css";
import Legend from "./showLegend";
import WasteGenerated from "../dashboardPage/components/wasteGenerated";
import BinSidebar from "./components/binSidebar";
import useFetch from "../../hooks/useFetch";
import {
	TrashContainerType,
	TrashbinContext,
} from "../../context/trashbinContext";

function setTrashbinStatus(trashPercentage: number) {
	if (trashPercentage >= 75) {
		return {
			color: "#ef4444",
			classes: "bg-red-500/10 text-red-600 border-red-500/30",
		};
	} else if (trashPercentage >= 40) {
		return {
			color: "#f59e0b",
			classes: "bg-amber-500/10 text-amber-600 border-amber-500/30",
		};
	} else {
		return {
			color: "#00cb6a",
			classes: "bg-[#00cb6a]/10 text-[#00cb6a] border-[#00cb6a]/30",
		};
	}
}

function MapController({ center }: { center: [number, number] | null }) {
	const map = useMap();
	
	useEffect(() => {
		if (center) {
			map.flyTo(center, 20, {
				duration: 1.0
			});
		}
	}, [center, map]);

	return null;
}

export default function Maps() {
	const trashbinData = useContext(TrashbinContext);
	const [trashbin, setTrashbin] = useState<TrashContainerType[]>();
	const [legend, showLegend] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [focusLocation, setFocusLocation] = useState<[number, number] | null>(null);

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
		<div className="flex h-screen w-screen overflow-hidden relative">
			<Sidebar />
			<div className="flex-1 relative">
				<MapContainer
				center={[mapContainer.lat, mapContainer.lng]}
				zoom={mapContainer.zoom}
				scrollWheelZoom={mapContainer.scroll}
				zoomControl={mapContainer.zoomCtrl}
			>
				<MapController center={focusLocation} />
				<SearchControl />
				<TileLayer
					maxNativeZoom={tileLayer.nativeZoom}
					maxZoom={tileLayer.maxZoom}
					url={tileLayer.url}
				/>

				{trashbin &&
					trashbin.map((data, idx) => {
						const status = setTrashbinStatus(data.capacity);
						const svgIcon = L.divIcon({
							className: "custom-leaflet-icon",
							html: `
								<div class="flex items-center justify-center w-10 h-10 rounded-full border-[3px] shadow-md bg-white overflow-hidden" style="border-color: ${status.color}">
									<div class="w-full h-full flex items-center justify-center font-bold text-sm ${status.classes.split(' ')[0]} ${status.classes.split(' ')[1]}">
										${data.capacity}%
									</div>
								</div>
							`,
							iconSize: [40, 40],
							iconAnchor: [20, 20],
						});

						return (
							<Marker
								key={idx}
								position={[
									data.location.latitude,
									data.location.longitude,
								]}
								icon={svgIcon}
							>
								<Popup className="custom-popup">
									<div className="bg-white rounded-lg p-0 m-0 min-w-[320px]">
										<div className="px-5 py-4 border-b border-gray-100">
											<div className="flex items-center justify-between mb-2">
												<h3 className="text-lg font-bold tracking-tight text-[#171717] m-0">Bin {data.id || "N/A"}</h3>
												<span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${status.classes}`}>
													{data.capacity}%
												</span>
											</div>
											<div className="flex flex-col gap-1 mt-3">
												<div className="flex items-center text-sm">
													<span className="text-gray-500 w-20">Location</span>
													<span className="font-medium text-gray-900">{data.organization || "N/A"}</span>
												</div>
												<div className="flex flex-center text-sm">
													<span className="text-gray-500 w-20">Type</span>
													<span className="font-medium text-gray-900">{data.type || "N/A"}</span>
												</div>
											</div>
										</div>
										<div className="p-4 bg-gray-50/50">
											<p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Waste Generated</p>
											<div className="w-full h-[180px] bg-white rounded-md border border-gray-100 p-2 shadow-sm">
												<WasteGenerated />
											</div>
										</div>
									</div>
								</Popup>
							</Marker>
						);
					})}

				{legend && <Legend close={handleHideLegend} />}
				<button
					type="button"
					className="absolute bottom-6 left-6 z-[400] bg-[#216604] hover:bg-[#62A944] text-white font-medium rounded-full px-6 py-2.5 shadow-md transition-colors"
					onClick={handleToggleShow}
				>
					Legend
				</button>
			</MapContainer>
			<BinSidebar 
				isOpen={isSidebarOpen} 
				onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
				onBinClick={(lat, lng) => setFocusLocation([lat, lng])}
			/>
			</div>
		</div>
	);
}
