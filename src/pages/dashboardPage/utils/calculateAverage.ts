import useFetch from "../../../hooks/useFetch"
import getBuidlingNames from "./getBuildingNames"

export default async function calculateAverage(){
    const data = await useFetch("waste/latest", "latest")
    const buildingCount = getBuidlingNames(data).length
    const totalWeight = data[0].overall_weight
    return totalWeight / buildingCount
}