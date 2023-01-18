import React from "react";
import { GetServerSideProps } from "next";
import { Chat } from "../components/Chat/Chat";
import {
  Account,
  ChatRoom,
  getAccountList,
  getChatRoomInfo,
} from "../api/store";

export type ChatPage = {
  roomId: string;
  initRoomInfo: ChatRoom;
  initAccountList: Account[];
};

function chat({ initRoomInfo, roomId, initAccountList }: ChatPage) {
  return (
    <Chat
      initRoomInfo={initRoomInfo}
      roomId={roomId}
      initAccountList={initAccountList}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const roomId = query.id;
  if (typeof roomId === "string") {
    const initRoomInfo = (await getChatRoomInfo(roomId)) as ChatRoom;
    const initAccountList = await getAccountList();

    return {
      props: {
        roomId,
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
