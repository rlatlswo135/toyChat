import { fbApp, fbAuth, fbDb } from "./firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  updateProfile,
  UserCredential,
  deleteUser,
} from "firebase/auth";
import { usePostCollectionData } from "./hook";
import { changeLoginState, deleteAccountInStore, ImageType } from "./store";

export const loginAccount = async (
  email: string,
  password: string
): Promise<UserCredential | string> => {
  try {
    await fbAuth.setPersistence(browserLocalPersistence);
    const result = await signInWithEmailAndPassword(fbAuth, email, password);
    console.log("````````````login - result````````````", result);
    await changeLoginState(email, true);
    return result;
  } catch (err: any) {
    console.error(err);
    return err.code;
  }
};

export const updateAccount = async (
  name: string,
  photoURL: ImageType
): Promise<void | string> => {
  try {
    const currentUser = fbAuth.currentUser;
    if (currentUser) {
      const update = await updateProfile(currentUser, {
        displayName: name,
        photoURL: photoURL || "",
      });
      console.log("update", update);
      return update;
    }
  } catch (err: any) {
    console.error(err);
    return err.code;
  }
};

export const createAccount = async (
  email: string,
  name: string,
  password: string
) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      fbAuth,
      email,
      password
    );

    const update = await updateProfile(user, {
      displayName: name,
      photoURL: "",
    });

    const result = await usePostCollectionData("accounts", {
      uid: user.uid,
      email: user.email,
      name: name || "기본이름",
      image: "",
      isLogin: true,
    });

    return result;
  } catch (err: any) {
    console.error(err);
    return err.code;
  }
};

export const logOutAccount = async (email: string) => {
  try {
    const data = await fbAuth.signOut();
    changeLoginState(email, false);
    return data;
  } catch (err: any) {
    console.error(err);
    return err.code;
  }
};

export const deleteAccount = async (docId: string) => {
  try {
    const user = fbAuth.currentUser;
    if (fbAuth && user) {
      const result = await deleteUser(user);
      const resultInStore = await deleteAccountInStore(docId);

      return resultInStore;
    }
  } catch (err: any) {
    console.error(err);
    return err.code;
  }
};
