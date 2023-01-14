import React from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Chat } from "../components/Chat/Chat";
import {
  Account,
  ChatRoom,
  getAccountList,
  getChatRoomInfo,
  getChatroomList,
} from "../api/store";
import { ChatMain } from "../components/ChatMain";

type Chat = {
  roomId: string;
  initRoomInfo: ChatRoom;
  initChatRoomList: ChatRoom[];
  initAccountList: Account[];
};

function chat({
  initChatRoomList,
  initAccountList,
  initRoomInfo,
  roomId,
}: Chat) {
  const router = useRouter();

  if (typeof router.query.id === "string") {
    return (
      <ChatMain initUserList={initAccountList} initChatRoom={initChatRoomList}>
        <Chat init={initRoomInfo} roomId={roomId} />
      </ChatMain>
    );
  }

  return <div>Error!</div>;
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
  res,
}) => {
  const roomId = query.id;
  if (typeof roomId === "string") {
    const initChatRoomList = await getChatroomList();
    const initAccountList = await getAccountList();
    const initRoomInfo = (await getChatRoomInfo(roomId)) as ChatRoom;
    return {
      props: {
        roomId,
        initChatRoomList,
        initRoomInfo,
        initAccountList,
      },
    };
  }
  return {
    props: {
      roomInfo: null,
    },
  };
};

export default chat;
