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
    const cred = await signInWithPopup(auth, provider)
    saveCookie(JSON.stringify(cred))
    return cred
  } 
  return credentials
}
