
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyCDuKmbpr2ipKQM9w_YRK3Mwxg02_M0MxU",
    authDomain: "custom-exchange.firebaseapp.com",
    databaseURL: "https://custom-exchange-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "custom-exchange",
    storageBucket: "custom-exchange.appspot.com",
    messagingSenderId: "172687957854",
    appId: "1:172687957854:web:c37dc55c889c1fbdfff9cf",
    measurementId: "G-YZBY096EKW"
  };

export const app = initializeApp(firebaseConfig);
export const database = getFirestore()