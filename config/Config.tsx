import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyB0yEwBrNQzrWdmipMPILkxOZMLzJUJ9g4",
  authDomain: "juegos-26115.firebaseapp.com",
  databaseURL: "https://juegos-26115-default-rtdb.firebaseio.com",
  projectId: "juegos-26115",
  storageBucket: "juegos-26115.firebasestorage.app",
  messagingSenderId: "214719662585",
  appId: "1:214719662585:web:f8758909fbea39db6fd528"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app)