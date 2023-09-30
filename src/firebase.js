import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDtGT1PqlNGUAGcd98TTV9PY2vPgrP4Kk8",
    authDomain: "react-chat-app-3f5e0.firebaseapp.com",
    projectId: "react-chat-app-3f5e0",
    storageBucket: "react-chat-app-3f5e0.appspot.com",
    messagingSenderId: "462809416069",
    appId: "1:462809416069:web:4c4e87cf472a8976a104ec"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);