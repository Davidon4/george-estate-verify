// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPOrtgx3hpyrUhPIgTLvbJXyvcshiyD6s",
  authDomain: "george-crescent-verify.firebaseapp.com",
  projectId: "george-crescent-verify",
  storageBucket: "george-crescent-verify.appspot.com",
  messagingSenderId: "363296334323",
  appId: "1:363296334323:web:96f4813a3ab15c2e227286",
  measurementId: "G-7JH4F7WEMQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export {auth, firestore};