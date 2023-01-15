import React, { useCallback, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImExit } from "react-icons/im";
import { FcInvite } from "react-icons/fc";
import { RiCloseLine } from "react-icons/ri";
import tw from "tailwind-styled-components";
import {
  ChatRoom,
  deleteChatRoom,
  deleteUserInChatRoom,
} from "../../api/store";
import { postChatData } from "../../api/store";
import { AuthContext, useAuthContext } from "../../provider/AuthProvider";
import { MyChat, OtherChat } from "./_Chat";
import { getNow } from "../../api/util";
import { useRouter } from "next/router";
import { useDocState } from "../../api/hook";
import { ChatPage } from "../../pages/chat";

// Todo 그룹채팅 + 마이페이지 이미지수정 + 채팅빠를시 UI업데이트할것들 있나 + 오류메세지UI + 그룹초대 + timeStamp넣기

type ChatProps = ChatPage;
// 페이지이동이아닌 컴포넌트 View체인지니까 client에서 요청이 나을려나?
function Chat({ initRoomInfo, roomId }: ChatProps) {
  const router = useRouter();
  const { currentUser } = useAuthContext() as AuthContext;
  const [roomInfo, setRoomInfo] = useDocState<ChatRoom>(
    "chatRoom",
    roomId,
    initRoomInfo
  );
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [chatContent, setChatContent] = useState<string>("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setChatContent(e.target.value);

  const toggleMenuHandler = useCallback(
    () => setIsMenuOpen((prev) => !prev),
    []
  );

  const submitHandler = (e: React.SyntheticEvent) => {
    // Todo 챗전달후 포커스 아래로 + 빠르게보낼시 안보내지는거 확인 (실제데이터 들어가는지까지)
    // Todo 너무 빨리 시도했습니다 같은 UI업데이트위해 db에 업데이트중인지 확인해야할듯
    e.preventDefault();
    if (currentUser) {
      const data = {
        content: chatContent,
        sendInfo: { ...currentUser },
        createdAt: getNow(),
      };
      postChatData(roomId, data);
      setChatContent("");
    }
  };

  const exitChat = useCallback(() => {
    if (roomInfo) {
      const roomUsers = roomInfo?.users;
      if (roomUsers.length === 1 && roomUsers[0].uid === currentUser?.uid) {
        deleteChatRoom(roomId);
      } else {
        if (currentUser) {
          console.log("나가기");
          deleteUserInChatRoom(roomId, { ...currentUser });
        }
      }
      router.push("/chatlist");
    }
  }, [roomInfo]);

  return (
    <Div>
      <div className="flex-1 overflow-y-auto">
        <ChatHeader>
          <div className="flex justify-between">
            <button onClick={() => router.push("/chatlist")}>&larr;</button>
            <span>{`${roomInfo.users
              .map((user) => user.name)
              .join(",")}`}</span>
            <div>
              <button title="menu" onClick={toggleMenuHandler}>
                {isMenuOpen ? (
                  <RiCloseLine className="w-5 h-5" />
                ) : (
                  <GiHamburgerMenu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          {isMenuOpen && (
            <Menus>
              <Menu>
                <FcInvite className="w-5 h-5" />
                <span className="ml-3">Invite User</span>
              </Menu>
              <Menu onClick={exitChat}>
                <ImExit className="w-5 h-5" />
                <span className="ml-3">Exit</span>
              </Menu>
            </Menus>
          )}
        </ChatHeader>
        {/* 채팅박스 */}
        <TimeStamp>
          <span>timeStamp 00:00</span>
        </TimeStamp>
        <ChatWrap>
          {roomInfo.chatList.map((chat, idx) => {
            const {
              content,
              sendInfo: { uid, name, image },
              createdAt,
            } = chat;

            if (uid === currentUser?.uid) {
              return (
                <MyChat
                  key={`myChat-${idx}`}
                  time={createdAt}
                  content={content}
                />
              );
            }
            return (
              <OtherChat
                key={`otherChat-${idx}`}
                time={createdAt}
                content={content}
                img={image}
              />
            );
          })}
        </ChatWrap>
      </div>
      <form onSubmit={submitHandler}>
        <ChatInput
          placeholder="Put Your Message...."
          type="text"
          value={chatContent}
          onChange={(e) => changeHandler(e)}
        />
        <SendBtn>Send</SendBtn>
      </form>
    </Div>
  );
}

export { Chat };

const Div = tw.div`
  flex relative flex-col w-full h-full
`;

const ChatHeader = tw.header`
py-4 px-8 border-b-2 border-gray-400/20 text-l font-bold tracking-wide
`;

const TimeStamp = tw.div`
flex pt-2 justify-center text-time text-[0.9em]
`;

const ChatWrap = tw.div`
px-3
`;

const ChatInput = tw.input`
rounded-xl w-[90%] h-10 px-5 outline-none bg-gray-400 placeholder:text-white/30
`;

const SendBtn = tw.button`
text-m w-[10%] font-bold bg-gray-500 h-full rounded-xl
`;

const Menus = tw.ul`
absolute border-2 flex flex-col left-3/4 max-w-52 w-52 border-gray-400/20 bg-gray-400/80
`;

const Menu = tw.li`
flex items-center py-2 px-8 border-b-2 text-center border-gray-500/70 hover:bg-gray-500 hover:cursor-pointer
`;
