import { fbApp, fbDb } from "./firebase";
import { NextResponse, NextRequest } from "next/server";
import {
  Auth,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  updateProfile,
} from "firebase/auth";
import { useChangeLoginState, usePostCollectionData } from "./hook";
import { getAccountList } from "./store";

const fbAuth = getAuth(fbApp);

const loginAccount = async (auth: Auth, email: string, password: string) => {
  try {
    await fbAuth.setPersistence(browserLocalPersistence);
    const data = await signInWithEmailAndPassword(auth, email, password);
    useChangeLoginState(email, true);
  } catch (err) {
    console.error(err);
  }
};

const createAccount = async (
  auth: Auth,
  email: string,
  name: string,
  password: string
) => {
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

    await updateProfile(user, { displayName: name, photoURL: "" });
    usePostCollectionData("accounts", {
      uid: user.uid,
      email: user.email,
      name: name,
      image: "",
    });
  } catch (err) {
    console.error(err);
  }
};

const logOutAccount = async (auth: Auth, email: string) => {
  try {
    const data = await auth.signOut();
    useChangeLoginState(email, false);
    console.log("````````````logout - data````````````", data);
  } catch (err) {
    console.error(err);
  }
};

export { fbAuth, createAccount, loginAccount, logOutAccount };
