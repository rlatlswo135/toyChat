import React from "react";
import { AuthContext, useAuthContext } from "../provider/AuthProvider";
import { ChatList } from "../components/ChatList/ChatList";
import { GetServerSideProps } from "next";
import {
  Account,
  ChatRoom,
  getAccountList,
  getChatroomList,
} from "../api/store";
import { ChatMain } from "../components/ChatMain";

type ChatList = {
  initChatRoomList: ChatRoom[];
  initAccountList: Account[];
};

function chatList({ initChatRoomList, initAccountList }: ChatList) {
  const { currentUser } = useAuthContext() as AuthContext;
  console.log("````````````currentUser````````````", currentUser);

  return (
    <ChatMain initUserList={initAccountList} initChatRoom={initChatRoomList}>
      <ChatList init={initChatRoomList} />
    </ChatMain>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const initChatRoomList = await getChatroomList();
  const initAccountList = await getAccountList();
  return {
    props: {
      initChatRoomList,
      initAccountList,
    },
  };
};

export default chatList;
