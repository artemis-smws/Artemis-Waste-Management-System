import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

import {config} from '../config/config'
import { getAuth } from "firebase/auth";

const firebase = initializeApp(config);

isSupported().then((result: boolean) => {
  if (result) {
    const analytics = getAnalytics(firebase);
  }
});

const auth = getAuth(firebase);

export default auth;