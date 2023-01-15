import React from "react";
import { ChatList } from "../components/ChatList/ChatList";
import { GetServerSideProps } from "next";
import { ChatRoom, getAccountList, getChatroomList } from "../api/store";

export type ChatListPage = {
  initChatRoomList: ChatRoom[];
};

function chatList({ initChatRoomList }: ChatListPage) {
  return <ChatList initChatRoomList={initChatRoomList} />;
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
