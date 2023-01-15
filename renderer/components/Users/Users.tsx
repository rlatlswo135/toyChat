import { useRouter } from "next/router";
import profile from "../../public/images/default.png";
import tw from "tailwind-styled-components";
import Image from "next/image";
import { isEqual } from "lodash";
import React, { useCallback } from "react";
import { useCollectionState } from "../../api/hook";
import { Account, ChatRoom, postChatRoom, User } from "../../api/store";
import { AuthContext, useAuthContext } from "../../provider/AuthProvider";
import { Empty } from "../Empty";
import { getNow } from "../util/time";
import { UsersPage } from "../../pages/users";
import { fbAuth } from "../../api/auth";
import Profile from "./Profile";

type UsersProps = UsersPage;
export function Users({ initAccountList, initChatRoomList }: UsersProps) {
  console.log("````````````auth````````````", fbAuth.currentUser);
  const router = useRouter();
  const { currentUser } = useAuthContext() as AuthContext;
  const [chatRoomList] = useCollectionState<ChatRoom>(
    "chatRoom",
    initChatRoomList
  );
  const [accountList] = useCollectionState<Account>(
    "accounts",
    initAccountList
  );

  const onClickUserHandler = useCallback(
    (uid: string, email: string, name: string, image: string | null) => {
      if (!currentUser) return;

      const users = [] as User[];
      users.push({ ...currentUser });
      if (uid !== currentUser.uid) {
        users.push({ image, email, name, uid });
      }

      const findRoomIndex = chatRoomList
        .map((room) => room.users)
        .findIndex((item) => isEqual(item, users));

      if (findRoomIndex >= 0) {
        const id = chatRoomList[findRoomIndex].docId;
        if (id) {
          intoChatRoom(id);
          return;
        }
        return;
      }
      createChatRoom(uid, email, name, image);
    },
    [chatRoomList]
  );

  const createChatRoom = useCallback(
    async (uid: string, email: string, name: string, image: string | null) => {
      if (!currentUser) {
        console.log("````````````user없음````````````");
        return;
      }

      const users = [] as User[];
      users.push({ ...currentUser });
      if (uid !== currentUser.uid) {
        users.push({ image, email, name, uid });
      }

      console.log("````````````users````````````", users);
      const newChatRoom = await postChatRoom({
        users,
        chatList: [],
        createdAt: getNow(),
      });
      if (newChatRoom) {
        router.push({
          pathname: "/chat",
          query: { id: newChatRoom.id },
        });
      }
    },
    [currentUser]
  );

  const intoChatRoom = useCallback((id: string) => {
    router.push({
      pathname: "/chat",
      query: { id },
    });
  }, []);

  return (
    <Container>
      {/* <MenuTitle>유저</MenuTitle> */}
      <p>나</p>
      <div>나담을박스</div>
      {accountList
        .sort((a, b) => Number(b.isLogin) - Number(a.isLogin))
        .map(({ uid, isLogin, email, name, image }) => (
          <Profile
            key={`user-${uid}`}
            onClick={() => onClickUserHandler(uid, email, name, image)}
            src={image || profile}
            name={name}
            email={email}
            size={40}
          />
        ))}
      <Empty />
    </Container>
  );
}

const Container = tw.div`
flex flex-col w-full mb-2 h-full
`;
