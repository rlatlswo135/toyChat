import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImExit } from "react-icons/im";
import { FcInvite } from "react-icons/fc";
import { RiCloseLine } from "react-icons/ri";
import tw from "tailwind-styled-components";
import {
  Account,
  ChatRoom,
  deleteChatRoom,
  deleteUserInChatRoom,
} from "../../api/store";
import { postChatData } from "../../api/store";
import { AuthContext, useAuthContext } from "../../provider/AuthProvider";
import { MyChat, OtherChat } from "./_Chat";
import { getNow, timeFormat } from "../util/time";
import { useRouter } from "next/router";
import { useCollectionState, useDocState } from "../../api/hook";
import { Spinner } from "../Spinner";
import { Invite } from "./Invite";
import { filterCurrent } from "../util/auth";
import { ChatMenus } from "./ChatMenus";

function Chat() {
  const router = useRouter();
  const { currentUser } = useAuthContext() as AuthContext;

  const roomId = router.query.id as string;

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [roomInfo] = useDocState<ChatRoom>("chatRoom", roomId, {
    docId: roomId,
    chatList: [],
    users: [],
    createdAt: "",
  });

  const [accountList] = useCollectionState<Account>("accounts", []);

  const [chatContent, setChatContent] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isInvite, setIsInvite] = useState<boolean>(false);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setChatContent(e.target.value);

  const toggleMenuHandler = useCallback(
    () => setIsMenuOpen((prev) => !prev),
    []
  );

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // * 타임스탬프같은경우는 chatList에서 getNow와 동일한 MM-dd가없을때 채팅데이터(타임스탬프)를 추가도 더 post해주면 될듯?
    if (currentUser) {
      const data = {
        content: chatContent,
        sendInfo: { ...currentUser },
        createdAt: getNow(),
        isSystem: false,
      };
      postChatData(roomId, data);
      setTimeout(() => {
        pushToScroll;
      }, 50);
      setChatContent("");
    }
  };

  const inviteUser = useCallback(() => {
    setIsInvite(true);
    setIsMenuOpen(false);
  }, []);

  const exitChat = useCallback(async () => {
    if (roomInfo) {
      const roomUsers = roomInfo?.users;
      if (roomUsers.length === 1 && roomUsers[0].uid === currentUser?.uid) {
        console.log("````````````방삭제````````````");
        await deleteChatRoom(roomId);
      } else {
        if (currentUser) {
          console.log("````````````나가기````````````");
          router.push({
            pathname: "/chatlist",
            query: {
              uid: currentUser.uid,
            },
          });
          await deleteUserInChatRoom(roomId, { ...currentUser });
        }
      }
    }
  }, [roomInfo]);

  const pushToScroll = useCallback(() => {
    if (scrollRef.current) {
      const height = scrollRef.current.offsetHeight;
      scrollRef.current.scrollTop = height;
    }
  }, []);

  const menus = useMemo(
    () => [
      {
        icon: <FcInvite className="w-5 h-5" />,
        text: "Invite User",
        click: inviteUser,
      },
      { icon: <ImExit className="w-5 h-5" />, text: "Exit", click: exitChat },
    ],
    []
  );

  useEffect(() => {
    if (scrollRef.current) {
      pushToScroll();
    }
    if (!roomInfo) {
      router.push("/chatlist");
    }
  }, [roomInfo]);

  if (!roomInfo) {
    return <Spinner text={null} />;
  }
  return (
    <Div>
      <ChatWrap
        ref={(ele) => {
          if (ele) {
            scrollRef.current = ele;
          }
        }}
      >
        <Header>
          <div className="flex justify-between">
            <button onClick={() => router.push("/chatlist")}>&larr;</button>
            <span>{`${roomInfo.users
              .map((user) => user.name)
              .join(",")}`}</span>
            <div>
              <button
                title="menu"
                name="menuBtn"
                onClick={toggleMenuHandler}
                className="w-6 h-6"
              >
                {isMenuOpen ? (
                  <RiCloseLine size="100%" />
                ) : (
                  <GiHamburgerMenu size="100%" />
                )}
              </button>
            </div>
          </div>
          {isMenuOpen && <ChatMenus menus={menus} setter={setIsMenuOpen} />}
        </Header>
        {/* 채팅박스 */}
        <TimeStamp>
          <span>{`생성:${roomInfo.createdAt.split(" ")[0]}`}</span>
        </TimeStamp>
        <div className="px-3">
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
                  time={timeFormat(createdAt)}
                  content={content}
                />
              );
            }
            return (
              <OtherChat
                key={`otherChat-${idx}`}
                time={timeFormat(createdAt)}
                name={filterCurrent(uid, accountList)[0].name || "DEFAULT"}
                content={content}
                img={image}
              />
            );
          })}
        </div>
      </ChatWrap>
      <form onSubmit={submitHandler}>
        <ChatInput
          placeholder="Put Your Message...."
          type="text"
          value={chatContent}
          onChange={(e) => changeHandler(e)}
        />
        <SendBtn>Send</SendBtn>
      </form>
      {isInvite && (
        <Invite
          setIsInvite={setIsInvite}
          roomInfo={roomInfo}
          roomId={roomId}
          currentUser={currentUser}
        />
      )}
    </Div>
  );
}

export { Chat };

const Div = tw.div`
  flex relative flex-col w-full h-full
`;

const Header = tw.header`
py-4 px-8 border-b-2 border-gray-400/20 text-l font-bold tracking-wide
`;

const TimeStamp = tw.div`
flex pt-2 justify-center text-time text-[0.9em]
`;

const ChatWrap = tw.div`
flex-1 overflow-y-auto pb-2
`;

const ChatInput = tw.input`
rounded-xl w-[90%] h-10 px-5 outline-none bg-gray-400
placeholder:text-white/30
`;

const SendBtn = tw.button`
text-m w-[10%] font-bold bg-gray-500 h-full rounded-xl
`;

const Menu = tw.li`
flex items-center py-2 px-8 border-b-2 text-center border-gray-500/70
hover:bg-gray-500 hover:cursor-pointer
`;
