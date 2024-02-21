import { MapContainer, Marker, Popup, TileLayer, useMap} from 'react-leaflet';
import { mapContainer, tileLayer, TrashContainer } from './maps';
import Sidebar from '../../components/layout/sidebar';
import SearchControl from './search-location';
import 'leaflet/dist/leaflet.css'
import './index.scss'
import { useState } from 'react';
import Legend from './showLegend';
import WasteGenerated from '../dashboardPage/components/wasteGenerated';

export default function Maps1(){

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

                {TrashContainer.map((position, count) => (
                    <Marker key={count} position={[position.lat, position.lng]} icon={position.icon}>
                        <Popup>
                            <div className='d-flex justify-content-around container-header w-100'>  
                                <h1>Trashbin ID: </h1>
                                <h1>{TrashContainer[count].trashbinID}</h1>
                            </div>
                            <div className='w-100 d-flex flex-column justify-content-center align-items-center'>
                                <p>Location: {TrashContainer[count].trashbinLocation}</p>
                                <p>Percentage: {TrashContainer[count].trashPercentage}%</p>
                                <div className='w-100 d-flex justify-content-around'>
                                    <p>Status: {TrashContainer[count].trashStatus}</p>
                                    <p>Weight: {TrashContainer[count].trashWeight}</p>
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

