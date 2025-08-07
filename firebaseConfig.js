import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
import { getDatabase } from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// Initialize Firebase
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDSvmOLzooEXRJhGGMq_AgSsrTjMEwFsc",
  authDomain: "monitoreo-del-cacao.firebaseapp.com",
  databaseURL: "https://monitoreo-del-cacao-default-rtdb.firebaseio.com",
  projectId: "monitoreo-del-cacao",
  storageBucket: "monitoreo-del-cacao.appspot.com",
  messagingSenderId: "404993008050",
  appId: "1:404993008050:web:acc09732182f6b556044ab",
  measurementId: "G-P89XX7DK56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const firestore = getFirestore(app);


export { app, database, auth, firestore };