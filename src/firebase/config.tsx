// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpdvXTA_Ojj_MK6Axb3P6nwtvwvvbRiEQ",
  authDomain: "reactapp-cefdd.firebaseapp.com",
  projectId: "reactapp-cefdd",
  storageBucket: "reactapp-cefdd.appspot.com",
  messagingSenderId: "896366929564",
  appId: "1:896366929564:web:3f1cc8d3f35c4c92b66f59",
  measurementId: "G-HBJV5B1YBC"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(FirebaseApp);

export { FirebaseApp, db };