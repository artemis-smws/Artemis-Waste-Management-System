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
            icon : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAY0lEQVR4nO2SUQqAIBAF98M79+t5tkNOBAohmGkrbOF8LjIDD0V+By+RFfA/0fdh9kSsQIvBhRQITflgQB/L3QLEnsddswDxPFgGtJRbB0Ipv8NlYL9EtqrIihyZFkiR6jc9AGIR56daLnJIAAAAAElFTkSuQmCC",
            route : '/data',
            disable : false
        },
    ]
}