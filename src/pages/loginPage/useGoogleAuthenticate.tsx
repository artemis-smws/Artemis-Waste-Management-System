import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../../services/firebase";
import { getCookie, saveCookie } from "../../utils/cookies";

export default async function useGoogleAuthenticate() {
  const credentials = getCookie()
  if(!credentials) {
    const provider = await new GoogleAuthProvider()
    provider.setCustomParameters({
        prompt : "select_account"
    })
    try {
      const cred = await signInWithPopup(auth, provider)
      saveCookie(JSON.stringify(cred))
      console.log("Successfully logged in!")
      return cred
    } catch(e : any) {
      (e instanceof Error)&& console.log(e.message)
    }
  } 
  return credentials
}
