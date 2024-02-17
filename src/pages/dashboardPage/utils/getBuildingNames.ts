export default function getBuidlingNames(data: any[]) {
    const returnList: any[] = []
    const keys = Object.keys(data[0])
    keys.forEach(key => {
        if (key != "createdAt" && key != "overall_biodegradable" && key != "overall_recyclable" && key != "overall_residual" && key != "overall_infectious" && key != "overall_weight" && key != "id") {
            returnList.push(key)
        }
    })
    return returnList
}