import { fbApp, fbDb } from "./firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import { usePostCollectionData } from "./hook";
import { changeLoginState } from "./store";

const fbAuth = getAuth(fbApp);

const loginAccount = async (
  email: string,
  password: string
): Promise<UserCredential | string> => {
  try {
    await fbAuth.setPersistence(browserLocalPersistence);
    const data = await signInWithEmailAndPassword(fbAuth, email, password);
    await changeLoginState(email, true);
    return data;
  } catch (err: any) {
    console.error(err);
    return err.code;
  }
};

const createAccount = async (email: string, name: string, password: string) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      fbAuth,
      email,
      password
    );

    await updateProfile(user, { displayName: name, photoURL: "" });
    const result = await usePostCollectionData("accounts", {
      uid: user.uid,
      email: user.email,
      name: name || "기본이름",
      image: "",
      isLogin: true,
    });
    await loginAccount(email, password);
    return result;
  } catch (err: any) {
    console.error(err);
    return err.code;
  }
};

const logOutAccount = async (email: string) => {
  try {
    const data = await fbAuth.signOut();
    changeLoginState(email, false);
    return data;
  } catch (err: any) {
    console.error(err);
    return err.code;
  }
};

export { fbAuth, createAccount, loginAccount, logOutAccount };
