import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext, useAuthContext } from "../provider/AuthProvider";
import Header from "../components/Header";
import { getAccountList } from "../api/store";
import tw from "tailwind-styled-components";
import { UserList } from "../components/UserList";
import { ChatList } from "../components/ChatList";

function chatList() {
  const router = useRouter();
  const { currentUser, isLoading } = useAuthContext() as AuthContext;

  // Todo redirect부분 -> 작업끝난후 주석해제
  // useEffect(() => {
  //   if (!currentUser && !isLoading) {
  //     router.push("/home");
  //     return;
  //   }
  // }, [currentUser, isLoading]);

  return (
    <div className="flex flex-col h-full">
      <Header />
      <p className="border-b-2 pt-24 py-12 text-center text-8xl font-bold">
        Welcom to Toy Chat
      </p>
      <div className="flex flex-1 w-full max-h-full mx-auto pt-12 overflow-x-hidden">
        <UserList />
        <ChatList />
      </div>
    </div>
  );
}

export default chatList;
