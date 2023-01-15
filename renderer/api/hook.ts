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
  deleteDoc,
} from "firebase/firestore";
import { Router } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { fbDb } from "./firebase";

type Collection = "accounts" | "chatRoom";

// ************** State
export const useCollectionState = <T>(
  colName: Collection,
  init: T[]
): [T[], Dispatch<SetStateAction<T[]>>] => {
  const [docs, setDocs] = useState<T[]>(init);
  const ref = collection(fbDb, colName);

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

// Todo : initial로 next.js로 불러온거 넣고 그다음 snapShot계속
export const useDocState = <T>(
  colName: Collection,
  docId: string,
  init: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [docData, setDocData] = useState<T>(init);
  const ref = doc(fbDb, colName, docId);

  useEffect(() => {
    onSnapshot(ref, (snapshot: DocumentData) => {
      setDocData(snapshot.data());
    });
  }, []);

  return [docData, setDocData];
};

// ********************* STORE CRUD TEMPLATE ************************* //
export const useDocData = async (collectionName: Collection, docId: string) => {
  try {
    const ref = doc(fbDb, collectionName, docId);
    const result = await getDoc(ref);
    return result.data();
  } catch (err) {
    console.error(err);
    return err;
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
  } catch (err: any) {
    console.error(err);
    return err.code;
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
  } catch (err: any) {
    console.error(err);
    return err;
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
    return err;
  }
};

export const useUpdateDocData = async (
  colName: Collection,
  docId: string,
  data: WithFieldValue<DocumentData>
) => {
  try {
    if (docId) {
      const ref = doc(fbDb, colName, docId);
      const result = await updateDoc(ref, data);
      return result;
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const useDeleteDocData = async (colName: Collection, docId: string) => {
  try {
    if (docId) {
      const ref = doc(fbDb, colName, docId);
      const result = await deleteDoc(ref);
      return result;
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};

// ************************************************************************** //

export const usePageLoading = () => {
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  useEffect(() => {
    const routeStartEvent = () => setPageLoading(true);
    const routeEndEvent = () => setPageLoading(false);
    const routeErrEvent = (e: any) => setPageLoading(false);

    Router.events.on("routeChangeStart", routeStartEvent);
    Router.events.on("routeChangeComplete", routeEndEvent);
    Router.events.on("routeChangeError", routeErrEvent);

    return () => {
      Router.events.off("routeChangeStart", routeStartEvent);
      Router.events.off("routeChangeComplete", routeErrEvent);
      Router.events.off("routeChangeError", routeEndEvent);
    };
  }, []);

  return { pageLoading };
};
