import { fbInit } from "./firebase";
import { NextResponse, NextRequest } from "next/server";
import {
  Auth,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

const fbAuth = getAuth(fbInit);
setPersistence(fbAuth, browserLocalPersistence);

const createAccount = async (auth: Auth, email: string, password: string) => {
  try {
    if (password.length < 6) {
      console.log("password 더길게");
      return;
    }
    const data = await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
  }
};

const loginAccount = async (auth: Auth, email: string, password: string) => {
  try {
    // const persistance = await auth.setPersistence({ type: "LOCAL" });
    const data = await signInWithEmailAndPassword(auth, email, password);
    console.log("````````````data````````````", data);
  } catch (err) {
    console.error(err);
  }
};

const logOutAccount = async (auth: Auth) => {
  try {
    const data = await signOut(auth);
    console.log("````````````data````````````", data);
  } catch (err) {
    console.error(err);
  }
};

export { fbAuth, createAccount, loginAccount, logOutAccount };
