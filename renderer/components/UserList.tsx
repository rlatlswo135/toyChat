import React, { Dispatch, SetStateAction, useState } from "react";
import { isEqual } from "lodash";
import tw from "tailwind-styled-components";
import Image from "next/image";
import { useCollectionState } from "../api/hook";
import { Account, ChatRoom, postChatRoom, User } from "../api/store";
import { CurrentUser } from "../provider/AuthProvider";
import profile from "../public/images/default.png";
import { getNow } from "../api/util";
import { useRouter } from "next/router";
import { Spinner } from "./Spinner";

type UserListProps = {
  accountList: Account[];
  initChatRoom: ChatRoom[];
  currentUser: CurrentUser;
};

function UserList({ accountList, initChatRoom, currentUser }: UserListProps) {
  const router = useRouter();
  const [loading, setIsLoading] = useState<boolean>(false);
  const [chatRoomList] = useCollectionState<ChatRoom>("chatRoom", initChatRoom);

  const createChatRoom = async (
    uid: string,
    email: string,
    name: string,
    image: string | null
  ) => {
    const users = [] as User[];
    if (uid && email && name && currentUser) {
      users.push({ ...currentUser });
      if (uid !== currentUser.uid) {
        users.push({ image, email, name, uid });
      }

      // ** 유저리스트가 중복되는 방이면 생성X
      const findExistRoomIndex = chatRoomList
        .map((room) => room.users)
        .findIndex((item) => isEqual(item, users));

      // Todo 그 방으로 redirect 시켜야할듯
      if (findExistRoomIndex >= 0) {
        // router.push가 중복이 많은것같으니 커스텀훅을 만드는것도 좋을지도
        const id = chatRoomList[findExistRoomIndex].docId;
        if (
          router.query &&
          router.query.id === chatRoomList[findExistRoomIndex].docId
        ) {
          console.log("현재채팅");
          return;
        }

        if (id) {
          router.push({
            pathname: "/chat",
            query: { id: chatRoomList[findExistRoomIndex].docId },
          });
        }
        return;
      }

      setIsLoading(true);
      const newRoom = await postChatRoom({
        users,
        chatList: [],
        createdAt: getNow(),
      });

      if (newRoom) {
        console.log("````````````newRoom````````````", newRoom);
        router.push({
          pathname: "/chat",
          query: { id: newRoom.id },
        });
      }
      setIsLoading(false);
    }
  };

  if (loading || !accountList) {
    return <Spinner />;
  }
  // Todo width 가변인거 수정
  return (
    <Div>
      <Title>User List</Title>
      {accountList
        .sort((a, b) => Number(b.isLogin) - Number(a.isLogin))
        .map(({ uid, isLogin, email, name, image }) => (
          <UserDiv
            onClick={() => createChatRoom(uid, email, name, image)}
            key={`uid-${uid}`}
            $login={isLogin}
          >
            <UserImage>
              <Image
                alt="error"
                width={40}
                height={40}
                src={profile}
                className="p-1"
              />
            </UserImage>
            <UserContent>
              <span className="ml-1">{name}</span>
              <span className="ml-1 text-sm text-gray-300/70 max-w-[150px] overflow-hidden text-ellipsis">
                {email}
              </span>
            </UserContent>
          </UserDiv>
        ))}
    </Div>
  );
}
// text-ellipsis overflow-x-hidden
export { UserList };

type UserDivProps = {
  $login: boolean;
};

const Div = tw.div`
flex flex-col p-4 w-60 overflow-y-auto
`;

const UserDiv = tw.div<UserDivProps>`
    flex justify-start h-12 hover:cursor-pointer hover:font-bold hover:border-l-2 mb-3
    ${(props) => (props.$login ? "text-white" : "text-logout")}
`;

const Title = tw.div`
text-center text-xl font-bold border-b-2 pb-4 mb-6
`;

const UserImage = tw.div`
rounded-full overflow-hidden
`;

const UserContent = tw.div`
flex flex-col pl-1
`;
