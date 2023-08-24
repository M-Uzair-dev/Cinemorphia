// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAECvjSFtxXkSDLI5Di6CniGOm_xLB9WTQ",
  authDomain: "cinemorphia-48ae0.firebaseapp.com",
  projectId: "cinemorphia-48ae0",
  storageBucket: "cinemorphia-48ae0.appspot.com",
  messagingSenderId: "274150537433",
  appId: "1:274150537433:web:e416fa56a0b45c2ea1e6c8",
  measurementId: "G-5CZ6WMYW48",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesref = collection(db, "Movies");
export const reviewssref = collection(db, "Reviews");
export const userinfo = collection(db, "Users");
const analytics = getAnalytics(app);
