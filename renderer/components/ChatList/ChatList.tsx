import Link from "next/link";
import React, { useCallback } from "react";
import tw from "tailwind-styled-components";
import { useCollectionState } from "../../api/hook";
import { ChatRoom } from "../../api/store";
import { toTime, toTimeDistance, toYear, toDate, getNow } from "../../api/util";
import { ProfileImages } from "./ProfileImages";

type ChatListProps = {
  init: ChatRoom[];
};
// Todo 선택된 채팅있으면 LocalState하나 만들어서 있을시 Chat컴포넌트로 렌더하게
function ChatList({ init }: ChatListProps) {
  const [chatRoomList, setChatRoomList] = useCollectionState<ChatRoom>(
    "chatRoom",
    init
  );

  const timeFormat = useCallback((time: string): string => {
    if (!time) {
      return "";
    }

    const result = toTimeDistance(getNow(), time);
    switch (result) {
      case "error":
        return "";
      case "today":
        return toTime(time);
      case "1day":
        return "어제";
      case "2day":
        return "그저께";
      case "month":
      case "days":
        return toDate(time);
      default:
        return toYear(time);
    }
  }, []);

  if (!chatRoomList.length) {
    return (
      <div className="flex h-full justify-center items-center text-5xl font-bold tracking-wide text-gray-400/70">
        Empty Room
      </div>
    );
  }

  return (
    <>
      {chatRoomList.map((chat) => {
        const { docId, users, createdAt, chatList } = chat;
        return (
          <Link
            key={`room-${docId}`}
            href={{ pathname: "/chat", query: { id: docId } }}
          >
            <Div>
              <ChatWrap key={`room-${docId}`}>
                {/* 이미지컨테이너는 가변 그리드? */}
                <ProfileImages users={users} />
                <Contents>
                  <p className="p-1 tracking-wide font-semibold text-2xl">
                    {users
                      .map((item) => item.name)
                      .slice(0, 4)
                      .join(",")}
                    <span className="ml-3 text-sm text-gray-400">
                      {users.length}
                    </span>
                  </p>
                  <p className="flex-1 p-1 text-gray-300/80">
                    {chatList.at(-1)?.content ? (
                      <span>{chatList.at(-1)?.content}</span>
                    ) : (
                      <span>&nbsp;</span>
                    )}
                  </p>
                </Contents>
              </ChatWrap>
              <span className="text-time">
                {chatList.length
                  ? timeFormat(chatList[chatList.length - 1].createdAt)
                  : timeFormat(createdAt)}
              </span>
            </Div>
          </Link>
        );
      })}

      <div className="flex h-1/6 items-center justify-center text-4xl opacity-30">
        Empty Room
      </div>
    </>
  );
}

export { ChatList };

const Div = tw.div`
flex justify-between pl-3 pr-5 items-center border-b-2 border-gray-300/10 hover:bg-gray-500 hover:cursor-pointer
`;
const ChatWrap = tw.div`
flex items-center h-28
`;

const Contents = tw.div`
flex flex-col justify-between  
`;
