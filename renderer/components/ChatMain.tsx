import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import tw from "tailwind-styled-components";
import { Account, ChatRoom } from "../api/store";
import { AuthContext, useAuthContext } from "../provider/AuthProvider";
import Header from "./Header";
import { UserList } from "./UserList";
import { useCollectionState } from "../api/hook";

type ChatMainProps = {
  initUserList: Account[];
  initChatRoom: ChatRoom[];
  children: ReactNode;
};
function ChatMain({ initUserList, initChatRoom, children }: ChatMainProps) {
  const router = useRouter();

  const [accountList] = useCollectionState<Account>("accounts", initUserList);
  const { currentUser, isLoading } = useAuthContext() as AuthContext;

  useEffect(() => {
    if (!currentUser && !isLoading) {
      router.push("/home");
    }
  }, [currentUser, isLoading]);

  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="flex flex-1 w-full max-h-full mx-auto pt-12 overflow-x-hidden">
        <Div>
          <ChatWrap>{children}</ChatWrap>
        </Div>
      </div>
    </div>
  );
}

export { ChatMain };

const Div = tw.div`
px-10 py-4 flex-1 max-h-full max-w-full grow-[10]
`;

const ChatWrap = tw.div`
w-full h-full items-center bg-gray-400/25 overflow-y-auto
`;
