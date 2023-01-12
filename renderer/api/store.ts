import { getDocs, collection, doc } from "firebase/firestore";
import { fbDb } from "./firebase";
import { useCollectionData } from "./hook";

export type Account = {
  uid: string;
  email: string;
  docId: string;
  isLogin: boolean;
  name: string;
};

export type ChatRoom = {
  docId: string;
  chatList: { content: string; sendInfo: { uid: string; email: string } }[];
  roomId: string;
  users: { uid: string; email: string }[];
  lastChat: Date;
};

const getChatroomList = async () => {
  const result = await useCollectionData<ChatRoom>("chatRoom");
  console.log("````````````chat list````````````", result);
  return result;
};

const getAccountList = async () => {
  const result = await useCollectionData<Account>("accounts");
  console.log("````````````account````````````", result);
  return result;
};

export { getAccountList, getChatroomList };
