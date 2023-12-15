import getBuidlingNames from "./getBuildingNames"

export default function calculateOverallAverage(data : Array<any>) {
    let totalWaste = 0
    let totalEntries = 0
    data.forEach(entry => {
        totalWaste += entry.overall_weight
        totalEntries++
    })
    return (totalWaste / totalEntries).toFixed(2)
}