import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
//   authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
//   projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
//   storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
//   messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
//   appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
//   measurementId: `${process.env.REACT_APP_FIREBASE_MEASUREMENT_ID}`
// };

const firebaseConfig = {
  apiKey: "AIzaSyDCWN__jJe2-ARbi-VO9WQ3j5ACVvPOpEo",
  authDomain: "authentiai-web.firebaseapp.com",
  projectId: "authentiai-web",
  storageBucket: "authentiai-web.appspot.com",
  messagingSenderId: "9417872452",
  appId: "1:9417872452:web:7e444603b5a2ac85779811",
  measurementId: "G-W8E0ZRER5B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
const analytics = getAnalytics(app);