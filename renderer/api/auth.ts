import { fbApp, fbDb } from "./firebase";
import {
  Auth,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  updateProfile,
} from "firebase/auth";
import { usePostCollectionData } from "./hook";
import { changeLoginState } from "./store";

const fbAuth = getAuth(fbApp);

const loginAccount = async (auth: Auth, email: string, password: string) => {
  try {
    await fbAuth.setPersistence(browserLocalPersistence);
    const data = await signInWithEmailAndPassword(auth, email, password);
    changeLoginState(email, true);
    return data;
  } catch (err: any) {
    console.error(err);
    return err.code;
  }
};

const createAccount = async (
  auth: Auth,
  email: string,
  name: string,
  password: string
) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const test = await updateProfile(user, { displayName: name, photoURL: "" });
    const result = await usePostCollectionData("accounts", {
      uid: user.uid,
      email: user.email,
      name: name,
      image: "",
    });
    return result;
  } catch (err: any) {
    console.error(err);
    return err.code;
  }
};

const logOutAccount = async (auth: Auth, email: string) => {
  try {
    const data = await auth.signOut();
    changeLoginState(email, false);
    return data;
  } catch (err: any) {
    console.error(err);
    return err.code;
  }
};

export { fbAuth, createAccount, loginAccount, logOutAccount };
