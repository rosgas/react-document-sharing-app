import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDV0ZFFm5i2U_LYXMMbSYSboAUzrprv9wc",
  authDomain: "document-sharing-app-9dd91.firebaseapp.com",
  projectId: "document-sharing-app-9dd91",
  storageBucket: "document-sharing-app-9dd91.appspot.com",
  messagingSenderId: "169489040741",
  appId: "1:169489040741:web:abd3456a2a4e9fedf94d8c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();
