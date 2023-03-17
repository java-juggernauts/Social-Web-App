// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeITp92wJP-uyv1dRs4oDD31c8lutrzNs",
  authDomain: "social-ebaa0.firebaseapp.com",
  projectId: "social-ebaa0",
  storageBucket: "social-ebaa0.appspot.com",
  messagingSenderId: "825170740027",
  appId: "1:825170740027:web:c01ae5d5aaacb861efed1e",
  measurementId: "G-PEC7175L31"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);