import React from "react";
import { GetServerSideProps } from "next";
import { Chat } from "../components/Chat/Chat";
import { ChatRoom, getChatRoomInfo } from "../api/store";

export type ChatPage = {
  roomId: string;
  initRoomInfo: ChatRoom;
};

function chat({ initRoomInfo, roomId }: ChatPage) {
  return <Chat initRoomInfo={initRoomInfo} roomId={roomId} />;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const roomId = query.id;
  if (typeof roomId === "string") {
    const initRoomInfo = (await getChatRoomInfo(roomId)) as ChatRoom;
    return {
      props: {
        roomId,
        initRoomInfo,
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
