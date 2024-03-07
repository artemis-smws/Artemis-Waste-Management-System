export default function getWeight (data : any, type : string) {
    if (type && data) {
        if (type === "recyclable") { 
            return (typeof data[type].total === "number") ? data[type].total : 0
        } 
        else if (type === "biodegradable" || type === "infectious" || type === "residual" || type === "total") {
            return (typeof data[type] == "number") ? data[type] : 0
        } else {
            console.error("Invalid type")
            return 0
        }
    } else {
        console.error("No data or type provided")
        return 0
    }
}