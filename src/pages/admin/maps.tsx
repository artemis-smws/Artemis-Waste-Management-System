/*
install dependencies on terminal(for map display):

npm install react react-dom leaflet
npm install react-leaflet
npm install -D @types/leaflet
*/


import { MapContainer } from 'react-leaflet'
import { TileLayer } from 'react-leaflet'
import { useMap } from 'react-leaflet'
import { Marker } from 'react-leaflet'
import { Popup } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

export default function Maps(){

    return(

        <div>
            <MapContainer center = {[13.78428, 121.0743]} zoom={25} scrollWheelZoom={false}>
                <TileLayer
                    maxNativeZoom={19}
                    maxZoom={20}
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[13.78428, 121.0743]}>
                    <Popup>
                    Trash Bin 1. <br /> 80%
                    </Popup>
                </Marker>

                <Marker position={[13.78409, 121.07486]}>
                    <Popup>
                    Trash Bin 2. <br /> 40%
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
        
    )

}