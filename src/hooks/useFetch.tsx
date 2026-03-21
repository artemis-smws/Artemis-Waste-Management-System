import devFetch from "../api/devFetch";

const DEV_MODE = import.meta.env.VITE_DEV_MODE === "true";

export default async function useFetch(endpoint : string, name ?: string) {
    if (DEV_MODE) {
        return devFetch(endpoint, name);
    }
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