import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { useCollectionState } from "../api/hook";
import { ChatRoom, getChatroomList } from "../api/store";

function ChatList() {
  const [chatRoomList, setChatRoomList] =
    useCollectionState<ChatRoom>("chatRoom");

  // Todo 선택된 채팅있으면 LocalState하나 만들어서 있을시 Chat컴포넌트로 렌더하게

  return (
    <Div>
      <ChatRoomWrap>
        {chatRoomList.map((chat) => {
          const { roomId, users, lastChat, chatList } = chat;
          return (
            <ChatRoom key={`room-${roomId}`}>
              <div className="flex h-full">
                <div className="border-2 h-full flex-grow-[0.5]">이미지들</div>
                <div className="flex flex-col border-2 h-full flex-grow-[6]">
                  <p className="h-full border-2">유저목록</p>
                  <p className="h-full">{chatList.at(-1)?.content}</p>
                </div>
                <div className="border-2 h-full flex-grow-[0]">
                  마지막 채팅 날짜
                </div>
              </div>
              {/* {users.map((user, idx) => (
                <span key={`room-${roomId}-name-${user.email}-${idx}`}>
                  {user.email}
                </span>
              ))} */}
            </ChatRoom>
          );
        })}
        <div className="flex h-1/6 items-center justify-center text-4xl opacity-30">
          Empty Room
        </div>
      </ChatRoomWrap>
    </Div>
  );
}

export { ChatList };

const Div = tw.div`
px-10 py-4 flex-1 max-h-full grow-[10]
`;

const ChatRoomWrap = tw.div`
h-full items-center bg-gray-400/25 overflow-y-auto
`;

const ChatRoom = tw.div`
  w-full h-1/6 border-dotted border-b border-gray-500/60
`;
