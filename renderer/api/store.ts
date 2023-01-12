import { getDocs, collection, doc } from "firebase/firestore";
import { fbDb } from "./firebase";
import { useCollectionData } from "./hook";

export type Account = {
  uid: string;
  email: string;
  docId: string;
  isLogin: boolean;
};

type ChatRoom = {
  docId: string;
  chatList: { content: string; sendInfo: Account }[];
  roomId: string;
  users: Account[];
};

const getChatroomList = async () => {
  const result = await useCollectionData<ChatRoom>("chatRoom");
  return result;
};

const getAccountList = async () => {
  const result = await useCollectionData<Account>("accounts");
  console.log("````````````account````````````", result);
  return result;
};

export { getAccountList, getChatroomList };
