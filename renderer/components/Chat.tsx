import React, { Dispatch, SetStateAction, useState } from "react";
import tw from "tailwind-styled-components";
import { ChatRoom, getChatRoomInfo } from "../api/store";
import { useDocState } from "../api/hook";
import { postChatData } from "../api/store";
import { AuthContext, useAuthContext } from "../provider/AuthProvider";

type ChatProps = {
  roomId: string;
  setRoomId: Dispatch<SetStateAction<string>>;
};

// 페이지이동이아닌 컴포넌트 View체인지니까 client에서 요청이 나을려나?
function Chat({ roomId, setRoomId }: ChatProps) {
  const { currentUser } = useAuthContext() as AuthContext;
  const [roomInfo, setRoomInfo] = useDocState<ChatRoom>("chatRoom", roomId);
  const [chatContent, setChatContent] = useState<string>("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setChatContent(e.target.value);

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (currentUser) {
      const data = { content: chatContent, sendInfo: { ...currentUser } };
      postChatData(roomId, data);
      setChatContent("");
    }
  };

  const exitChat = () => setRoomId("");

  return (
    <div className="flex relative flex-col w-full h-full">
      <div className="flex-1">
        <button
          onClick={exitChat}
          className="absolute top-2 left-[97%] text-xl font-bold opacity-50 z-50 hover:text-gray-900"
        >
          x
        </button>
        {/* 채팅박스 */}
        <div>asd</div>
      </div>
      <form className="p-1" onSubmit={submitHandler}>
        <input
          className="rounded-xl w-[90%] h-10 px-5 outline-none bg-gray-400 placeholder:text-white/30"
          placeholder="Put Your Message...."
          type="text"
          value={chatContent}
          onChange={(e) => changeHandler(e)}
        />
        <button className="text-m w-[10%] font-bold bg-gray-500 h-full rounded-xl">
          Send
        </button>
      </form>
    </div>
  );
}

export { Chat };
