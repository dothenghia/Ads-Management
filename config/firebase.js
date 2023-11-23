import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCCwBk70gZo4XITye1w7ffkjbkFbeRBHw8",
  authDomain: "firstproject-90f9e.firebaseapp.com",
  projectId: "firstproject-90f9e",
  storageBucket: "firstproject-90f9e.appspot.com",
  messagingSenderId: "502907593610",
  appId: "1:502907593610:web:6971222eb80fc8f4225e73",
  measurementId: "G-YNQP3S54HB"
};
  
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
