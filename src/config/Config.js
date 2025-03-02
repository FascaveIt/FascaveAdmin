// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNywarvMV6pd9SSHV_mDxFvvFDwERittc",
  authDomain: "fascave-a2cec.firebaseapp.com",
  projectId: "fascave-a2cec",
  storageBucket: "fascave-a2cec.firebasestorage.app",
  messagingSenderId: "461774102239",
  appId: "1:461774102239:web:e506e16db71d2106b6936a",
  measurementId: "G-WEZ1S53Z5G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
