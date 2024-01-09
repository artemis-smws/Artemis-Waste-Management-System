import { HouseDoorFill } from "react-bootstrap-icons";

export const sidebar = {
    sidebar_button : [
        {
            name : "Dashboard",
            icon : "./assets/icons/house-door-fill.svg",
            route : '/dashboard',
            disable : false
        },
        {
            name : "Maps",
            icon : "./assets/icons/geo-alt-fill.svg",
            route : '/maps',
            disable : false
        },
        {
            name : "Trash bin",
            icon : "./assets/icons/trash3-fill.svg",
            route : '/bin',
            disable : false
        },
        {
            name : "Auth",
            icon : "./assets/icons/person-fill.svg",
            route : '/auth',
            disable : true
        },
        {
            name : "Data",
            icon : "./assets/icons/person-fill.svg",
            route : '/data',
            disable : true
        },
    ]
}