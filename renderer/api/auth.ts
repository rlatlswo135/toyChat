import { fbApp, fbDb } from "./firebase";
import { NextResponse, NextRequest } from "next/server";
import {
  Auth,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { useChangeLoginState, usePostCollectionData } from "./hook";
import { getAccountList } from "./store";

const fbAuth = getAuth(fbApp);

const loginAccount = async (auth: Auth, email: string, password: string) => {
  try {
    await fbAuth.setPersistence(browserLocalPersistence);
    const data = await signInWithEmailAndPassword(auth, email, password);
    console.log("````````````login - data````````````", data);
    useChangeLoginState(email, true);
  } catch (err) {
    console.error(err);
  }
};

const createAccount = async (auth: Auth, email: string, password: string) => {
  try {
    if (password.length < 6) {
      console.log("password 더길게");
      return;
    }
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("````````````register````````````", user);
    usePostCollectionData("accounts", { uid: user.uid, email: user.email });
    loginAccount(auth, email, password);
  } catch (err) {
    console.error(err);
  }
};

const logOutAccount = async (auth: Auth, email: string) => {
  try {
    const data = await auth.signOut();
    console.log("````````````email````````````", email);
    useChangeLoginState(email, false);
    console.log("````````````logout - data````````````", data);
  } catch (err) {
    console.error(err);
  }
};

export { fbAuth, createAccount, loginAccount, logOutAccount };
