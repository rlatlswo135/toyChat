import { WithFieldValue, arrayUnion, arrayRemove } from "firebase/firestore";
import {
  useCollectionData,
  useDeleteDocData,
  useDocData,
  usePostCollectionData,
  useUpdateDocData,
} from "./hook";

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
  image: string | null;
};

export type Chat = {
  content: string;
  sendInfo: User;
  createdAt: string;
};

export type ChatRoom = {
  docId?: string;
  chatList: Chat[];
  users: User[];
  createdAt: string;
};

// ********************** chatroom
export const getChatroomList = async () => {
  const result = await useCollectionData<ChatRoom>("chatRoom");
  return result;
};

export const getChatRoomInfo = async (docId: string) => {
  const result = await useDocData("chatRoom", docId);
  return result;
};

export const postChatRoom = async (data: WithFieldValue<ChatRoom>) => {
  const result = await usePostCollectionData<ChatRoom>("chatRoom", data);
  if (typeof result !== "string") {
    return result;
  }
};

export const deleteChatRoom = async (docId: string) => {
  const result = await useDeleteDocData("chatRoom", docId);
  return result;
};

export const deleteUserInChatRoom = async (docId: string, data: User) => {
  const body = {
    users: arrayRemove(data),
  };
  const result = await useUpdateDocData("chatRoom", docId, body);
  return result;
};

export const inviteUserInChatRoom = async (docId: string, data: User) => {
  const body = {
    users: arrayUnion(data),
  };
  const result = await useUpdateDocData("chatRoom", docId, body);
  return result;
};

// ********************** chat
export const postChatData = async (docId: string, data: Chat) => {
  const body = {
    chatList: arrayUnion(data),
  };
  const result = await useUpdateDocData("chatRoom", docId, body);
  return result;
};

// ********************** account
export const getAccountList = async () => {
  const result = await useCollectionData<Account>("accounts");
  return result;
};

export const changeLoginState = async (email: string, state: boolean) => {
  const result = await getAccountList();
  if (typeof result === "string") {
    return result;
  }
  const docId = result?.filter((doc) => doc.email === email)[0].docId;
  const data = { isLogin: state };
  if (docId) {
    const result = await useUpdateDocData("accounts", docId, data);
    return result;
  }
  console.error("no have docId -> changeLogin");
};

export const deleteAccountInStore = async (uid: string) => {
  const result = await useDeleteDocData("accounts", uid);

  if (typeof result === "string") {
    return result;
  }
};
