import {
  addDoc,
  getDocs,
  updateDoc,
  collection,
  doc,
  WithFieldValue,
  DocumentData,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { fbDb } from "./firebase";
import { getAccountList } from "./store";

type Collection = "accounts" | "chatRoom";
// state로 쓰기위해
export const useCollectionState = <T>(
  name: Collection
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

export const useDocState = <T>(colName: Collection, docId: string) => {
  const [docData, setDocData] = useState<T>();
  const ref = doc(fbDb, colName, docId);

  useEffect(() => {
    onSnapshot(ref, (snapshot: any) => {
      setDocData(snapshot.data());
    });
  }, []);

  return [docData, setDocData];
};

// ********************* STORE CRUD TEMPLATE ************************* //
export const useDocData = async (collectionName: Collection, docId: string) => {
  try {
    const ref = doc(fbDb, collectionName, docId);
    const docSnapShot = await getDoc(ref);

    console.log("`````````````docSnapShot```````````", docSnapShot);
  } catch (err) {
    console.error(err);
  }
};
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

export const usePostDocData = async <T>(
  colName: Collection,
  docId: string,
  data: WithFieldValue<DocumentData>
) => {
  try {
    const ref = doc(fbDb, colName, docId);
  } catch (err) {
    console.error(err);
  }
};

export const useUpdateDocData = async (
  colName: Collection,
  docId: string,
  data: WithFieldValue<DocumentData>
) => {
  if (docId) {
    const ref = doc(fbDb, colName, docId);
    const result = await updateDoc(ref, data);
    return result;
  }
};

// ************************************************************************** //
