export default async function useFetch(endpoint : string, name ?: string) {
    const data = await fetch(
        `${import.meta.env.VITE_API_URL}${endpoint}`,
        {
            method : "GET",
            headers : {
                "Content-Type" : "application/json"
            }
        }
    )
    const jsonData = await data.json()
    if (name) {
        localStorage.setItem(name, JSON.stringify(jsonData))
    }
    return jsonData
}   