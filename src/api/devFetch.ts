/**
 * devFetch — replaces useFetch when VITE_DEV_MODE=true.
 * Loads /dev-data.json once, then resolves each endpoint to the
 * matching key inside that file so the rest of the app works unchanged.
 */

let cache: Record<string, unknown> | null = null;

async function loadDevData(): Promise<Record<string, unknown>> {
  if (cache) return cache;
  const res = await fetch("/dev-data.json");
  cache = await res.json();
  return cache as Record<string, unknown>;
}

/** Maps an API endpoint string to the key used in dev-data.json */
function endpointToKey(endpoint: string): string {
  const clean = endpoint.replace(/^\/+|\/+$/g, ""); // strip leading/trailing slashes
  if (clean === "trashbin") return "trashbin";
  if (clean === "waste") return "waste";
  if (clean === "waste/latest/7days")   return "waste_7days";
  if (clean === "waste/latest/30days")  return "waste_30days";
  if (clean === "waste/latest/90days")  return "waste_90days";
  if (clean === "waste/latest/365days") return "waste_365days";
  // Fallback: try the endpoint as-is, replacing slashes with underscores
  return clean.replace(/\//g, "_");
}

export default async function devFetch(endpoint: string, name?: string): Promise<unknown> {
  const data = await loadDevData();
  const key = endpointToKey(endpoint);
  const result = data[key] ?? [];
  if (name) {
    localStorage.setItem(name, JSON.stringify(result));
  }
  return result;
}
