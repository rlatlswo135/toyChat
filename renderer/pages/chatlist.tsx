import React from "react";
import { ChatList } from "../components/ChatList/ChatList";
import { GetServerSideProps } from "next";
import { ChatRoom, getAccountList, getChatroomList } from "../api/store";

// export type ChatListPage = {
//   initChatRoomList: ChatRoom[];
// };

function chatList() {
  // return <ChatList initChatRoomList={initChatRoomList} />;
  return <ChatList />;
}

// export const getServerSideProps: GetServerSideProps = async (req) => {
//   console.log(req.query);
//   const initChatRoomList = await getChatroomList();
//   const initAccountList = await getAccountList();

//   if (typeof initChatRoomList === "string") {
//     return {
//       props: {
//         initAccountList,
//         initChatRoomList: [],
//       },
//     };
//   }
//   return {
//     props: {
//       initChatRoomList,
//       initAccountList,
//     },
//   };
// };

export default chatList;
