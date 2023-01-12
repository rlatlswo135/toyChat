import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext, useAuthContext } from "../provider/AuthProvider";
import Header from "../components/Header";
import ChatList from "../components/ChatList";

function chatList() {
  const router = useRouter();
  const { currentUser, isLoading } = useAuthContext() as AuthContext;

  console.log("currentUser", currentUser);
  // useEffect(() => {
  //   if (!currentUser && !isLoading) {
  //     router.push("/home");
  //     return;
  //   }
  // }, []);

  return (
    <div className="h-full">
      <Header />
      <ChatList />
    </div>
  );
}

export default chatList;
