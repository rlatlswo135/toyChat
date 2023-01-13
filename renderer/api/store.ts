import {
  getDocs,
  collection,
  doc,
  DocumentData,
  WithFieldValue,
} from "firebase/firestore";
import { fbDb } from "./firebase";
import { useCollectionData, usePostCollectionData } from "./hook";

export type Account = {
  uid: string;
  email: string;
  docId: string;
  isLogin: boolean;
  name: string;
  image: string | null;
};

export type User = {
  uid: string;
  email: string;
  name: string;
};
export type ChatRoom = {
  docId?: string;
  chatList: { content: string; sendInfo: User }[];
  users: User[];
  createdAt?: Date;
  lastChat?: Date;
};

const getChatroomList = async () => {
  const result = await useCollectionData<ChatRoom>("chatRoom");
  return result;
};

const postChatRoom = async (data: WithFieldValue<ChatRoom>) => {
  const result = await usePostCollectionData<ChatRoom>("chatRoom", data);
  return result;
};

const getAccountList = async () => {
  const result = await useCollectionData<Account>("accounts");
  return result;
};

export { getAccountList, getChatroomList, postChatRoom };
