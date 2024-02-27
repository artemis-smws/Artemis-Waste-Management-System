import L from "leaflet"
import './index.scss'

export const mapContainer = {
    lat: 13.78428,
    lng: 121.0743,
    zoom: 19,
    scroll: true,
    zoomCtrl: false
}

export const tileLayer = {
    nativeZoom: 19,
    maxZoom: 20,
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
}


export function _TrashContainer(lat : number, lng : number, trashPercentage : number, trashbinID : string) {
    return {
        lat : lat,
        lng : lng,
        icon: L.divIcon({
            className: "round-button",
            html: `<button type="button" id="green">${trashPercentage}%</button>` 
        }),
        trashbinID: trashbinID
    }
}


export const TrashContainer = [
    {
        lat: 13.78397, 
        lng: 121.07435,
        icon: L.divIcon({
            className: "round-button",
            html: `<button type="button" id="green">${"30%"}</button>` 
        }),
        trashbinID: 1,
        trashbinLocation: 'Outside - Near CICS Building',
        trashPercentage: 30,
        trashStatus: 'Trashbin not Full',
        trashWeight: 24,
    },
    {
        lat: 13.78430,
        lng: 121.07457,
        icon: L.divIcon({
            className: "round-button",
            html: `<button type="button" id="yellow">50%</button>` 
        }),
        trashbinID: 2,
        trashbinLocation: 'Outside - Near CEAFA Building',
        trashPercentage: 50,
        trashStatus: 'Trashbin not Full',
        trashWeight: 64,
    },
    {
        lat: 13.78440,
        lng: 121.07457,
        icon: L.divIcon({
            className: "round-button",
            html: `<button type="button" id="yellow">50%</button>` 
        }),
        trashbinID: 3,
        trashbinLocation: 'Outside - Near CEAFA Building',
        trashPercentage: 50,
        trashStatus: 'Trashbin not Full',
        trashWeight: 64,
    }
]

