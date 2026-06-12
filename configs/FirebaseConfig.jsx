// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-logo-generator-da47a.firebaseapp.com",
  databaseURL: "https://ai-logo-generator-da47a-default-rtdb.firebaseio.com",
  projectId: "ai-logo-generator-da47a",
  storageBucket: "ai-logo-generator-da47a.firebasestorage.app",
  messagingSenderId: "647010392236",
  appId: "1:647010392236:web:9447dc087935eaa24f2709",
  measurementId: "G-90ZDTDJ7TH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
