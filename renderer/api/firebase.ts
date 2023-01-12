// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import admin from "firebase-admin";

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

// init admin
// const adminApp = admin.initializeApp(firebaseConfig, "admin");

// Initialize Firebase
const fbApp = initializeApp(firebaseConfig);
const fbDb = getFirestore(fbApp);

const getUserList = async () => {};

export { fbApp, fbDb, getUserList };
