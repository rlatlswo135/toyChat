import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import tw from "tailwind-styled-components";
import { ChatRoom, deleteChatRoom, getChatRoomInfo } from "../api/store";
import { useDocState } from "../api/hook";
import { postChatData } from "../api/store";
import { AuthContext, useAuthContext } from "../provider/AuthProvider";
import { MyChat, OtherChat } from "./_Chat";

type ChatProps = {
  roomId: string;
  setRoomId: Dispatch<SetStateAction<string>>;
};

// Todo 그룹채팅 + 마이페이지 이미지수정 + 채팅빠를시 UI업데이트할것들 있나 + 오류메세지UI + 그룹초대 + timeStamp넣기

// 페이지이동이아닌 컴포넌트 View체인지니까 client에서 요청이 나을려나?
function Chat({ roomId, setRoomId }: ChatProps) {
  const { currentUser } = useAuthContext() as AuthContext;
  const [roomInfo] = useDocState<ChatRoom>("chatRoom", roomId);
  const [chatContent, setChatContent] = useState<string>("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setChatContent(e.target.value);

  const submitHandler = (e: React.SyntheticEvent) => {
    // Todo 챗전달후 포커스 아래로 + 빠르게보낼시 안보내지는거 확인 (실제데이터 들어가는지까지)
    // Todo 너무 빨리 시도했습니다 같은 UI업데이트위해 db에 업데이트중인지 확인해야할듯
    e.preventDefault();
    if (currentUser) {
      const data = { content: chatContent, sendInfo: { ...currentUser } };
      postChatData(roomId, data);
      console.log("````````````sendChat````````````");
      setChatContent("");
    }
  };

  const exitChat = useCallback(() => setRoomId(""), []);

  const deleteChat = useCallback(() => {
    deleteChatRoom(roomId);
    setRoomId("");
  }, [roomId]);

  console.log("````````````roomInfo````````````", roomInfo);

  if (!roomInfo) {
    return <div>Loading</div>;
  }

  return (
    <Div>
      <div className="flex-1 overflow-y-auto">
        {/* <button
          onClick={exitChat}
          className="absolute top-2 left-[97%] text-xl font-bold opacity-50 z-50 hover:text-gray-900"
        >
          x
        </button> */}
        <header className="py-4 px-8 flex justify-between border-b-2 border-gray-400/20 text-l font-bold tracking-wide">
          <button onClick={exitChat}>&larr;</button>
          <span>{`${roomInfo.users.map((user) => user.name).join(",")}`}</span>
          <button onClick={deleteChat}>Menu</button>
        </header>
        {/* 채팅박스 */}
        <div className="flex pt-2 justify-center text-gray-300/30 text-[0.9em]">
          <span>timeStamp 00:00</span>
        </div>
        <div id="chatWrap" className="px-3">
          {roomInfo.chatList.map((chat, idx) => {
            const {
              content,
              sendInfo: { uid, name, image },
            } = chat;

            if (uid === currentUser?.uid) {
              return (
                <MyChat
                  key={`myChat-${idx}`}
                  time={new Date()}
                  content={content}
                />
              );
            }
            return (
              <OtherChat
                key={`otherChat-${idx}`}
                time={new Date()}
                content={content}
                img={image}
              />
            );
          })}
          {/* <MyChat time={new Date()} content="test" /> */}
          {/* <OtherChat time={new Date()} content="test" img={null} /> */}
        </div>
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
    </Div>
  );
}

export { Chat };

const Div = tw.div`
  flex relative flex-col w-full h-full
`;
