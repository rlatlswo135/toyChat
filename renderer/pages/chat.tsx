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
import { Spinner } from "../components/Spinner";

type Chat = {
  roomId: string;
  initRoomInfo: ChatRoom;
  initChatRoomList: ChatRoom[];
  initAccountList: Account[];
  pageLoading: boolean;
};

function chat({
  initChatRoomList,
  initAccountList,
  initRoomInfo,
  roomId,
  pageLoading,
}: Chat) {
  const router = useRouter();

  return <div>chat</div>;

  if (typeof router.query.id === "string") {
    return (
      <ChatMain initUserList={initAccountList} initChatRoom={initChatRoomList}>
        {pageLoading ? (
          <Spinner className="flex flex-col justify-center items-center w-full h-full">
            <span className="text-xl font-bold pt-5 text-center">
              ChatList...
            </span>
          </Spinner>
        ) : (
          <Chat init={initRoomInfo} roomId={roomId} />
        )}
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
