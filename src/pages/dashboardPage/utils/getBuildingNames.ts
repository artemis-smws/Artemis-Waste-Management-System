export default function getBuidlingNames(data : string []) {
    const returnList : any [] = []
    data.forEach(d => {
        const keys = Object.keys(d)
        keys.forEach(key => {
            if(key != "createdAt" && key != "overall_biodegradable" && key != "overall_recyclable" && key != "overall_residual" && key != "overall_infectious" && key != "overall_weight" && key != "id") {
                returnList.push(key)
            }
        })
    })          
    return returnList   
}