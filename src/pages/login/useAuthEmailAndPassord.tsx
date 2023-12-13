import { getCookie, saveCookie } from "../../utils/cookies";

export default async function useAuthEmailAndPassword(
  email: String,
  password: any
) {
  const credentials = getCookie()
  if (!credentials) {
    const cred = await fetch(
      "https://us-central1-artemis-b18ae.cloudfunctions.net/server/auth/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const credJSON = await cred.json();
    saveCookie(credJSON.user.stsTokenManager.accessToken);
    return credJSON
  } else {
    return credentials
  }
}
