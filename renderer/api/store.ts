import {
  WithFieldValue,
  arrayUnion,
  arrayRemove,
  QueryConstraint,
} from "firebase/firestore";
import { updateAccount } from "./auth";
import {
  useCollectionData,
  useDeleteDocData,
  useDocData,
  usePostCollectionData,
  useUpdateDocData,
} from "./hook";

export type ImageType = string | null;
export type Account = {
  uid: string;
  email: string;
  docId: string;
  isLogin: boolean;
  name: string;
  image: ImageType;
};

export type User = {
  uid: string;
  email: string;
  name: string;
  image: ImageType;
};

export type Chat = {
  content: string;
  sendInfo: User;
  createdAt: string;
  isSystem?: boolean;
};

export type ChatRoom = {
  docId?: string;
  chatList: Chat[];
  users: User[];
  createdAt: string;
};
// ********************** chatroom
export const getChatroomList = async (query?: QueryConstraint) => {
  const result = await useCollectionData<ChatRoom>("chatRoom", query);
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

type EditInfo = {
  image: string | null;
  name: string;
};
export const changeAccountInfo = async (
  docId: string,
  uid: string,
  data: EditInfo
) => {
  // * upload
  // if (data.image) {
  //   const upload = await uploadFile(data.image);
  //   console.log("````````````upload````````````", upload);
  // }
  const { name, image: photoURL } = data;
  const update = await updateAccount(name, photoURL);
  if (typeof update === "string") {
    return update;
  }
  const result = await useUpdateDocData("accounts", docId, data);
  return result;
};

export const deleteAccountInStore = async (uid: string) => {
  const result = await useDeleteDocData("accounts", uid);

  if (typeof result === "string") {
    return result;
  }
};
