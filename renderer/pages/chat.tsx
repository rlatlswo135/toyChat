import React, { useCallback, useState } from "react";
import tw from "tailwind-styled-components";
import { GetServerSideProps } from "next";
import { Chat } from "../components/Chat/Chat";
import { ChatRoom, getChatRoomInfo } from "../api/store";

type Chat = {
  roomId: string;
  initRoomInfo: ChatRoom;
};

function chat({ initRoomInfo, roomId }: Chat) {
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

const Div = tw.div`
  flex relative flex-col w-full h-full
`;

const ChatHeader = tw.header`
py-4 px-8 border-b-2 border-gray-400/20 text-l font-bold tracking-wide
`;

const TimeStamp = tw.div`
flex pt-2 justify-center text-time text-[0.9em]
`;

const ChatWrap = tw.div`
px-3
`;

const ChatInput = tw.input`
rounded-xl w-[90%] h-10 px-5 outline-none bg-gray-400 placeholder:text-white/30
`;

const SendBtn = tw.button`
text-m w-[10%] font-bold bg-gray-500 h-full rounded-xl
`;

const Menus = tw.ul`
absolute border-2 flex flex-col left-3/4 max-w-52 w-52 border-gray-400/20 bg-gray-400/80
`;

const Menu = tw.li`
flex items-center py-2 px-8 border-b-2 text-center border-gray-500/70 hover:bg-gray-500 hover:cursor-pointer
`;
