export default function findHighest(data : Array<any>) {
    const temp_array : Array<number> = []
    let return_data = data[0]
    data.forEach((element : any) => {
        temp_array.push(element.overall_weight)
    })
    const max = Math.max(...temp_array)
    data.forEach((data : any) => {
        if (data.overall_weight === max) {
            return_data = data
        }
    })
    return return_data
}