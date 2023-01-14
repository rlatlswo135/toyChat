import React from "react";
import { useRouter } from "next/router";
import { Chat } from "../../components/Chat/Chat";

function chat() {
  const router = useRouter();

  if (typeof router.query.id === "string") {
    return <Chat roomId={router.query.id} />;
  }

  return <div>Error!</div>;
}

export default chat;
