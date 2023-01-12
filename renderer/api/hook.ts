import {
  addDoc,
  getDocs,
  updateDoc,
  collection,
  doc,
  WithFieldValue,
  DocumentData,
} from "firebase/firestore";
import { fbDb } from "./firebase";
import { getAccountList } from "./store";

export const useCollectionData = async <T>(name: string) => {
  try {
    const resultArray: T[] = [];
    const ref = collection(fbDb, name);
    const querySnapShot = await getDocs(ref);

    querySnapShot.forEach((doc) => {
      const data = doc.data() as T;
      resultArray.push({ ...data, docId: doc.id });
    });

    return resultArray;
  } catch (err) {
    console.error(err);
  }
};

export const usePostCollectionData = async <T>(
  name: string,
  data: WithFieldValue<DocumentData>
) => {
  try {
    const ref = collection(fbDb, name);
    const result = await addDoc(ref, data);
    console.log("````````````ref````````````", ref);
  } catch (err) {
    console.error(err);
  }
};

export const usePutCollectionData = async () => {};

export const useChangeLoginState = async (email: string, state: boolean) => {
  const accountList = await getAccountList();
  const docId = accountList?.filter((doc) => doc.email === email)[0].docId;

  if (docId) {
    const ref = doc(fbDb, "accounts", docId);
    const data = { isLogin: state };

    const result = await updateDoc(ref, data);
    console.log("````````````login update result````````````", result);
    return result;
  }
};
