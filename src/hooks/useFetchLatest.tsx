export default async function useFetchLatest() {
    try {
        const latestDataEndpoint = "https://us-central1-artemis-b18ae.cloudfunctions.net/v1/waste/latest"
        const latestData = await fetch(latestDataEndpoint, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            }
        })
        const dataJSON  = await latestData.json()
        return dataJSON
    } catch (e: any) {
        return null
    }
}