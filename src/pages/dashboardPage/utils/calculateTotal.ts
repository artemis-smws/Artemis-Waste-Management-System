export default function calculateTotal(data : any) {
    const total = {
        total_weight : 0,
        total_recyclable : 0,
        total_residual : 0,
        total_biodegradable : 0,
        total_infectious : 0
    }
    data.forEach((data : any) => {
        total.total_weight += data.overall_weight
        total.total_biodegradable += data.overall_biodegradable
        total.total_infectious += data.overall_infectious
        total.total_recyclable += data.overall_recyclable
        total.total_residual += data.overall_residual
    })
    return total
}