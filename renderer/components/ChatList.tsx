import { Timestamp } from "firebase/firestore";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import tw from "tailwind-styled-components";
import { useCollectionState } from "../api/hook";
import { ChatRoom, getChatroomList, postChatRoom } from "../api/store";
import { toTime, toTimeDistance, toYear, toDate } from "../api/util";
import { AuthContext, useAuthContext } from "../provider/AuthProvider";

type ChatListProps = {
  setRoomId: Dispatch<SetStateAction<string>>;
};
function ChatList({ setRoomId }: ChatListProps) {
  // Todo 선택된 채팅있으면 LocalState하나 만들어서 있을시 Chat컴포넌트로 렌더하게

  const [chatRoomList, setChatRoomList] =
    useCollectionState<ChatRoom>("chatRoom");

  const intoChatRoom = (id: string | undefined) => {
    console.log("into");
    if (id) {
      setRoomId(id);
    }
  };

  const timeFormat = useCallback((time: Timestamp): string => {
    console.log("````````````time````````````", time);
    if (!time) {
      return "";
    }

    const result = toTimeDistance(new Date(), time);
    console.log("````````````time````````````", time);
    switch (result) {
      case "error":
        return "";
      case "today":
        return toTime(time);
      case "1day":
        return "어제";
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
          <div
            onClick={() => intoChatRoom(docId)}
            key={`room-${docId}`}
            className="flex border-2 h-28 hover:cursor-pointer hover:bg-gray-500"
          >
            {/* 이미지컨테이너는 가변 그리드? */}
            <div className="p-2 border-2 w-20 h-20">이미지</div>
            <div className="flex flex-col w-full border-2 justify-between">
              <p className="border-2 p-1 tracking-wide font-bold">
                {users.map((item) => item.name).join(",")}
              </p>
              <p className="border-2 flex-1 p-1 text-gray-300/80">
                {chatList.at(-1)?.content}
              </p>
            </div>
            <span>
              {chatList.length
                ? timeFormat(chatList[chatList.length - 1].createdAt)
                : timeFormat(createdAt)}
            </span>
          </div>
        );
      })}

      <div className="flex h-1/6 items-center justify-center text-4xl opacity-30">
        Empty Room
      </div>
    </>
  );
}

export { ChatList };

const Room = tw.div`
  w-full h-1/6 border-dotted border-b border-gray-500/60 hover:cursor-pointer hover:bg-gray-500
`;
