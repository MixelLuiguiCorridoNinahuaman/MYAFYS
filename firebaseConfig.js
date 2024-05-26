import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
import { getDatabase } from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAfzqvf14sll-YfxnEUUwqUvwSqbUcLSkA",
  authDomain: "cocoa-air-conditioning.firebaseapp.com",
  projectId: "cocoa-air-conditioning",
  storageBucket: "cocoa-air-conditioning.appspot.com",
  messagingSenderId: "820515014767",
  appId: "1:820515014767:web:fc594a3ca80b1495b1259a",
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
