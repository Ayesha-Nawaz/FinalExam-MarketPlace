import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtj1y0tpWCo4BNG7zDX3xEm55WfT6x7sg",
  authDomain: "marketplace-fab2b.firebaseapp.com",
  projectId: "marketplace-fab2b",
  storageBucket: "marketplace-fab2b.firebasestorage.app",
  messagingSenderId: "278847616857",
  appId: "1:278847616857:web:19a36215718473d4087e48",
  measurementId: "G-4XDPK828B0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);

// Initialize Firebase Analytics (optional)
const analytics = getAnalytics(app);

const db = getFirestore(app); 

export { app, db }; 