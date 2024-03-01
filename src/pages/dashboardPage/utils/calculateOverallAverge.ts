export default function calculateOverallAverage(data : Array<any>) : number {
    let totalWaste = 0
    let totalEntries = 0
    data.forEach(entry => {
        totalWaste += entry.overall_weight
        totalEntries++
    })
    return Number((totalWaste / totalEntries).toFixed(2))
}