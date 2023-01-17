import React from "react";
import Link from "next/link";
import tw from "tailwind-styled-components";
import { ChatListPage } from "../../pages/chatlist";
import { useCollectionState } from "../../api/hook";
import { ChatRoom } from "../../api/store";
import { Empty } from "../Empty";
import { ProfileImages } from "./ProfileImages";
import { timeFormat } from "../util/time";
import { AuthContext, useAuthContext } from "../../provider/AuthProvider";
import { fbAuth } from "../../api/firebase";

type ChatListProps = ChatListPage;

// Todo 선택된 채팅있으면 LocalState하나 만들어서 있을시 Chat컴포넌트로 렌더하게
function ChatList({ initChatRoomList }: ChatListProps) {
  const { currentUser } = useAuthContext() as AuthContext;
  const [chatRoomList, setChatRoomList] = useCollectionState<ChatRoom>(
    "chatRoom",
    initChatRoomList
  );
  console.log("````````````chatRoomList````````````", chatRoomList);
  if (!currentUser) {
    return <div>err</div>;
  }

  return (
    <Container>
      {chatRoomList
        .filter((room) =>
          room.users.map((user) => user.uid).includes(currentUser.uid)
        )
        .map((chat) => {
          const { docId, users, chatList } = chat;
          return (
            <Link
              key={`chatRoom-${docId}`}
              href={{
                pathname: "/chat",
                query: {
                  id: docId,
                },
              }}
            >
              <ContentWrap>
                <div className="flex h-20">
                  <div className="w-20 p-3.5">
                    <ProfileImages users={users} />
                  </div>
                  <div className="flex flex-col justify-evenly">
                    <p className="tracking-wide font-semibold text-lg">
                      {users.slice(0, 4).map((item, idx, arr) => {
                        const text =
                          idx !== arr.length - 1
                            ? `${item.name + ","}`
                            : `${item.name}`;
                        if (item.uid === currentUser?.uid) {
                          return (
                            <span key="chatlist-name-Im">
                              {text}
                              <span className="text-sm text-logout">(나)</span>
                            </span>
                          );
                        }
                        return (
                          <span key={`chatlist-name-${item.uid}`}>{text}</span>
                        );
                      })}
                      <span className="pl-2 pb-6 text-xs text-gray-400">
                        {users.length}
                      </span>
                    </p>
                    <p className="tracking-wide font-semibold text-sm">
                      {chatList.at(-1)?.content}
                    </p>
                  </div>
                </div>
                <span className="text-time pr-5">
                  {timeFormat(chatList.at(-1)?.createdAt || "")}
                </span>
              </ContentWrap>
            </Link>
          );
        })}
      <Empty />
    </Container>
  );
}

export { ChatList };

const Container = tw.div`
flex flex-1 flex-col w-full mb-2
`;
const ContentWrap = tw.div`
w-full border-b-2 border-line flex justify-between items-center hover:cursor-pointer hover:bg-hover
`;
