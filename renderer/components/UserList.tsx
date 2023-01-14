import React, {
  useEffect,
  useState,
  useLayoutEffect,
  Dispatch,
  SetStateAction,
} from "react";
import tw from "tailwind-styled-components";
import Image from "next/image";
import { useCollectionState } from "../api/hook";
import { Account, ChatRoom, postChatRoom, User } from "../api/store";
import { AuthContext, useAuthContext } from "../provider/AuthProvider";
import profile from "../public/images/default.png";

type UserListProps = {
  setRoomId: Dispatch<SetStateAction<string>>;
};

function UserList({ setRoomId }: UserListProps) {
  const { currentUser } = useAuthContext() as AuthContext;

  const [chatRoomList, setChatRoomList] =
    useCollectionState<ChatRoom>("chatRoom");
  const [accountList, setAccountList] = useCollectionState<Account>("accounts");

  const createChatRoom = async (
    uid: string,
    email: string,
    name: string,
    image: string | null,
    isLogin: boolean
  ) => {
    const users = [] as User[];
    if (uid && email && name && currentUser) {
      users.push({ ...currentUser });
      if (uid !== currentUser.uid) {
        users.push({ image, email, name, uid });
      }

      const newRoom = await postChatRoom({
        users,
        chatList: [],
      });

      if (newRoom) {
        setRoomId(newRoom.id);
      }
    }
  };

  // Todo width 가변인거 수정
  return (
    <Div>
      <p className="text-center text-xl font-bold border-b-2 pb-4 mb-6">
        User List
      </p>
      {accountList
        .sort((a, b) => Number(b.isLogin) - Number(a.isLogin))
        .map(({ uid, isLogin, email, name, image }) => (
          <UserDiv
            onClick={() => createChatRoom(uid, email, name, image, isLogin)}
            key={`uid-${uid}`}
            $login={isLogin}
          >
            <div className="w-10 h-10 rounded-full bg-white overflow-hidden">
              <Image alt="error" src={profile} className="w-full h-full p-1" />
            </div>
            <div>
              <div className="h-full flex-[2] text-left pl-4">{name}</div>
            </div>
          </UserDiv>
        ))}
    </Div>
  );
}

export { UserList };

const Div = tw.div`
flex p-4 flex-col h-full w-60 overflow-y-auto overflow-x-hidden
`;

type UserDivProps = {
  $login: boolean;
};

const UserDiv = tw.div<UserDivProps>`
    flex items-center w-full h-12 m-1 text-center text-l hover:cursor-pointer hover:font-bold
    ${(props) => (props.$login ? "text-white" : "text-logout")}
`;
