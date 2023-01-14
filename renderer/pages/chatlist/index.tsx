import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext, useAuthContext } from "../../provider/AuthProvider";
import Header from "../../components/Header";
import tw from "tailwind-styled-components";
import { UserList } from "../../components/UserList";
import { ChatList } from "../../components/ChatList/ChatList";
import { Chat } from "../../components/Chat/Chat";

function chatList() {
  const router = useRouter();
  const { currentUser } = useAuthContext() as AuthContext;
  const [roomId, setRoomId] = useState<string>("");

  // Todo redirect부분 -> 작업끝난후 주석해제
  useEffect(() => {
    if (!currentUser) {
      router.push("/home");
      return;
    }
  }, [currentUser]);

  return <ChatList />;
}

export default chatList;

const Div = tw.div`
px-10 py-4 flex-1 max-h-full max-w-full grow-[10]
`;

const ChatWrap = tw.div`
w-full h-full items-center bg-gray-400/25 overflow-y-auto
`;
