// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDL6rsUjxfjmHDE60umZOiZW7nFMu_sOWI",
    authDomain: "react-chat-65fb1.firebaseapp.com",
    projectId: "react-chat-65fb1",
    storageBucket: "react-chat-65fb1.appspot.com",
    messagingSenderId: "659412518785",
    appId: "1:659412518785:web:df85f30355181b2eb6ca80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth=getAuth(app);

export default auth;