import useFetchLatest from "../../hooks/useFetchLatest"
import getBuidlingNames from "./getBuildingNames"

export default async function calculateAverage(){
    const data = await useFetchLatest()
    console.log(data)
    const buildingCount = getBuidlingNames(data).length
    const totalWeight = data[0].overall_weight
    return totalWeight / buildingCount
}