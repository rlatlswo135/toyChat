import {
  addDoc,
  getDocs,
  updateDoc,
  collection,
  doc,
  WithFieldValue,
  DocumentData,
  onSnapshot,
} from "firebase/firestore";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { fbDb } from "./firebase";
import { getAccountList } from "./store";

export const test = () => {
  console.log("aa");
};
// state로 쓰기위해
export const useCollectionState = <T>(
  name: "accounts" | "chatRoom"
): [T[], Dispatch<SetStateAction<T[]>>] => {
  const [docs, setDocs] = useState<T[]>([]);
  const ref = collection(fbDb, name);

  useEffect(() => {
    onSnapshot(ref, (snapshot) => {
      const result = snapshot.docs.map((item) => ({
        ...item.data(),
        docId: item.id,
      })) as T[];

      setDocs(result);
    });
  }, []);

  return [docs, setDocs];
};

// 단순한 get Templeate
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
    return result;
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
    return result;
  }
};
