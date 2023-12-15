import wrapPromise from "./wrapPromise";

type availableEndpoints =
  | "latest"
  | "latest/7days"
  | "latest/30days"
  | "highest"
  | "lowest";
export default function fetchDataFactory(url: availableEndpoints) {
  const promise = fetch(
    `https://us-central1-artemis-b18ae.cloudfunctions.net/server/waste/${url}`,
    {
      method: "GET",
      headers: {    
        "Content-Type": "application/json",
      },
    }
  )
  .then(res => res.json())

  return wrapPromise(promise);
}
