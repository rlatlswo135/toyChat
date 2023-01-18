import React from "react";
import { Account, ChatRoom } from "../api/store";
import { Users } from "../components/Users/Users";

export type UsersPage = {
  initAccountList: Account[];
  initChatRoomList: ChatRoom[];
};

// Todo 온라인 / 오프라인 나눠서 렌더 -> sort말고 filter로
export default function users() {
  return <Users />;
}
