// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArKBI3NxdvGf8504v0595LwU1OGGti3LI",
  authDomain: "next-js-crud--app-router.firebaseapp.com",
  projectId: "next-js-crud--app-router",
  storageBucket: "next-js-crud--app-router.appspot.com",
  messagingSenderId: "1050379828002",
  appId: "1:1050379828002:web:8a57d7f2d21be5ffe0c37b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
