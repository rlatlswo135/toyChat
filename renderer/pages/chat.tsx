import React from "react";
import { Chat } from "../components/Chat/Chat";
import { Account, ChatRoom } from "../api/store";

export type ChatPage = {
  roomId: string;
  initRoomInfo: ChatRoom;
  initAccountList: Account[];
};

function chat() {
  return <Chat />;
}

export default chat;
