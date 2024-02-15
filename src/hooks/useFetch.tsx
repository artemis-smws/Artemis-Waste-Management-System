export default async function useFetch(endpoint : string, name : string) {
    const data = await fetch(
        `https://us-central1-artemis-b18ae.cloudfunctions.net/v1/${endpoint}`,
        {
            method : "GET",
            headers : {
                "Content-Type" : "application/json"
            }
        }
    )
    localStorage.setItem(name, JSON.stringify(data))
    return true
}