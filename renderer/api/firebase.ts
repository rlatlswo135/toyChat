// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Auth, getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import * as firebase from "firebase/app";

// Your web app's Firebase configuration
// 나중에 env처리
const firebaseConfig = {
  apiKey: "AIzaSyCfqTA2OW1Rj2OoUyiiaWETtvb3tWD47TM",
  authDomain: "toychat-f80ff.firebaseapp.com",
  projectId: "toychat-f80ff",
  storageBucket: "toychat-f80ff.appspot.com",
  messagingSenderId: "345791914480",
  appId: "1:345791914480:web:2bcf168908b4fab57dbd35",
};

// Initialize Firebase

const fbInit = initializeApp(firebaseConfig);

export { fbInit };
