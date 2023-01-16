import { useRouter } from "next/router";
import profile from "../../public/images/default.png";
import tw from "tailwind-styled-components";
import { isEqual } from "lodash";
import React, { useCallback } from "react";
import { useCollectionState } from "../../api/hook";
import { Account, ChatRoom, postChatRoom, User } from "../../api/store";
import { AuthContext, useAuthContext } from "../../provider/AuthProvider";
import { Empty } from "../Empty";
import { getNow } from "../util/time";
import { UsersPage } from "../../pages/users";
import Profile from "./Profile";

type UsersProps = UsersPage;
export function Users({ initAccountList, initChatRoomList }: UsersProps) {
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
        return;
      }

      const users = [] as User[];
      users.push({ ...currentUser });
      if (uid !== currentUser.uid) {
        users.push({ image, email, name, uid });
      }

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

  if (!currentUser) {
    return <div>Loaidng</div>;
  }

  return (
    <Container>
      <Profile
        key={`user-Im`}
        onClick={() =>
          onClickUserHandler(
            currentUser.uid,
            currentUser.email,
            currentUser.name,
            currentUser.image
          )
        }
        src={currentUser.image || profile}
        name={currentUser.name}
        email={currentUser.email}
        isLogin
        imgSize={40}
        imgWrapSize={16}
        height={18}
      />
      <LoginState>온라인</LoginState>
      {accountList
        .filter((user) => user.uid !== currentUser?.uid && user.isLogin)
        .map(({ uid, email, name, image, isLogin }) => (
          <Profile
            onClick={() => onClickUserHandler(uid, email, name, image)}
            key={`user-${uid}`}
            src={image || profile}
            isLogin={isLogin}
            name={name}
            email={email}
            imgSize={40}
          />
        ))}
      <LoginState>오프라인</LoginState>
      {accountList
        .filter((user) => user.uid !== currentUser?.uid && !user.isLogin)
        .map(({ uid, email, name, image, isLogin }) => (
          <Profile
            onClick={() => onClickUserHandler(uid, email, name, image)}
            key={`user-${uid}`}
            src={image || profile}
            isLogin={isLogin}
            name={name}
            email={email}
          />
        ))}
      <Empty />
    </Container>
  );
}

const Container = tw.div`
flex flex-col w-full mb-2 h-full px-5
`;

const LoginState = tw.span`
text-gray-400 font-bold py-5
`;
