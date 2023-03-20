import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// import {setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";

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
export const storage = getStorage(app);
export const auth = getAuth(app);

// const email = 'user2@gmail.com'
// const password = '123456'
// setPersistence(auth, browserSessionPersistence)
//   .then(() => {
//     return signInWithEmailAndPassword(auth, email, password);
//   })
