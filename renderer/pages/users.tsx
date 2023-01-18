import { where } from "firebase/firestore";
import { GetServerSideProps } from "next";
import React from "react";
import {
  Account,
  ChatRoom,
  getAccountList,
  getChatroomList,
} from "../api/store";
import { Users } from "../components/Users/Users";
import { checkError, checkErrorAndSet } from "../components/util/error";

export type UsersPage = {
  initAccountList: Account[];
  initChatRoomList: ChatRoom[];
};

// Todo 온라인 / 오프라인 나눠서 렌더 -> sort말고 filter로
/*
{
  initAccountList,
  initChatRoomList,
}: UsersPage 
*/
export default function users() {
  // return (
  //   <Users
  //     initAccountList={initAccountList}
  //     initChatRoomList={initChatRoomList}
  //   />
  // );
  return <Users />;
}

// export const getServerSideProps: GetServerSideProps = async (req) => {
//   let initChatRoomList = await getChatroomList();
//   let initAccountList = await getAccountList();

//   return {
//     props: {
//       initAccountList,
//       initChatRoomList,
//     },
//   };
// };
