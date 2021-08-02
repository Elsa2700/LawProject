//firebase
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import 'firebase/auth';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEhhfNoyyTNN9F2NGIpscafVX4aJ5w0KE",
  authDomain: "my-law-app-129bd.firebaseapp.com",
  projectId: "my-law-app-129bd",
  storageBucket: "my-law-app-129bd.appspot.com",
  messagingSenderId: "587127569306",
  appId: "1:587127569306:web:54d69267398199962d9823",
  measurementId: "G-0VR6X96X9D"
};

  firebase.initializeApp(firebaseConfig);
  const firestore = firebase.firestore();
  const firedatabase = firebase.database();
  const auth = firebase.auth();
  export {firestore, firedatabase,auth};
