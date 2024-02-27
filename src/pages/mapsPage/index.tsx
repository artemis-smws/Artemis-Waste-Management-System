import { MapContainer, Marker, Popup, TileLayer, useMap} from 'react-leaflet';
import { mapContainer, tileLayer, TrashContainer } from './maps';
import Sidebar from '../../components/layout/sidebar';
import SearchControl from './search-location';
import 'leaflet/dist/leaflet.css'
import L from "leaflet"
import './index.scss'
import { useEffect, useState } from 'react';
import Legend from './showLegend';
import WasteGenerated from '../dashboardPage/components/wasteGenerated';
import useFetch from '../../hooks/useFetch';

enum TrashStatus {
    Full = "Trashbin Full",
    HalfFull = "Trashbin Half Full",
    NotFull = "Trashbin not Full"
}

type TrashContainerType = {
    type : string,
    organization : string,
    location : {
        latitude : number,
        longitude : number
    },
    id  : string,
    trashPercentage : number
}

function setTrashbinStatus(trashPercentage : number) : TrashStatus {
    if (trashPercentage >= 80) {
        return TrashStatus.Full
    } else if (trashPercentage >= 50) {
        return TrashStatus.HalfFull
    } else {
        return TrashStatus.NotFull
    }
}

export default function Maps1(){
    const [trashbin, setTrashbin] = useState<TrashContainerType[]>([])
        useFetch('trashbin', "trashbin")
            .then(data => {
                setTrashbin(data)
            })
        
    
    const [legend, showLegend] = useState(false);

    const toggleShow = () => {
        showLegend(true)
    }

    const hideLegend = () => {
        showLegend(false)
    }

    return(
        <div className="d-flex">
            <Sidebar/>
            <MapContainer 
                center = {[mapContainer.lat, mapContainer.lng]}
                zoom = {mapContainer.zoom}
                scrollWheelZoom = {mapContainer.scroll}
                zoomControl={mapContainer.zoomCtrl}
            >
                <SearchControl/>
                <TileLayer
                    maxNativeZoom={tileLayer.nativeZoom}
                    maxZoom={tileLayer.maxZoom}
                    url={tileLayer.url}
                />

                {trashbin.map((data, idx) => (
                    <Marker key={idx} position={[data.location.latitude, data.location.longitude]} icon={L.divIcon({
                        className : "round-button",
                        html : `<button type="button" id="green">${data.trashPercentage + "%"}</button>`
                    })}>
                        <Popup>
                            <div className='d-flex justify-content-around container-header w-100'>  
                                <h1>Trashbin ID: </h1>
                                <h1>{data.id}</h1>
                            </div>
                            <div className='w-100 d-flex flex-column justify-content-center align-items-center'>
                                <p>Location: {data.organization}</p>
                                <p>Percentage: {data.trashPercentage}%</p>
                                <div className='w-100 d-flex justify-content-around'>
                                    <p>Status: {setTrashbinStatus(data.trashPercentage)}</p>
                                    <p>Type: {data.type}</p>
                                </div>
                            </div>
                            <div id="trashbin-activity-chart">
                                <WasteGenerated />
                            </div>
                        </Popup>
                    </Marker>
                ))}
                
                {legend && <Legend close={hideLegend} />}
                <button type="button" className="btn" id="legend" onClick={toggleShow}>Legend</button>
            </MapContainer>
        </div>
    )
}

