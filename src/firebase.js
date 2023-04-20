// firebase.js
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
//  import { RecaptchaVerifier } from "firebase/auth";

// import firebase from "firebase/app";
//import firebase from "firebase/auth";
// import {initializeApp} from 'firebase/app'
// import { getAuth } from "firebase/auth";
import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAdWvz08lBfYsyWYMq0yk2HU4Zmd8TaC0g",
  authDomain: "eventmanagement-59875.firebaseapp.com",
  projectId: "eventmanagement-59875",
  storageBucket: "eventmanagement-59875.appspot.com",
  messagingSenderId: "706671756683",
  appId: "1:706671756683:web:eba222c4c702fd5e455b8e",
  measurementId: "G-P3N4P4FDG7",
};

// const app=initializeApp(config);
// export const authentication=getAuth(app);
firebase.initializeApp(config);
var auth = firebase.auth();
export {auth , firebase};


// const app = initializeApp(config);
// const auth = getAuth(app);
// const firestore = getFirestore(app);

// export { auth, firestore };
// export default app;