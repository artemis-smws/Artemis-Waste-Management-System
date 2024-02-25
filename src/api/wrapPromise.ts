export default function (promise : Promise<any>) {
    let status : string = "pending"
    let response  : any 
    
    const suspender = promise.then(
        (res) => {
            status = "success"
            response = res
        },
        (err) => {
            status = "error"
            response = err
        }
    )
    
    const read = () => {
        switch(status) {
            case "pending":
                throw suspender
            case "error":
                throw response
            default:
                const jsonString = JSON.stringify(response)
                localStorage.setItem("data_cache", jsonString)
                return response
        }
    }

    return {read}
}