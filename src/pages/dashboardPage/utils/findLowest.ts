export default function findLowest(data : Array<any>) {
    const temp_array : Array<number> = []
    let return_data = data[0]
    data.forEach((element : any) => {
        (element.overall_weight != 0) && temp_array.push(element.overall_weight)
    })
    const min = Math.min(...temp_array)
    data.forEach((data : any) => {
        if (data.overall_weight === min) {
            return_data = data
        }
    })
    return return_data
}