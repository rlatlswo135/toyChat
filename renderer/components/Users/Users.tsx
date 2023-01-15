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
import { getNow } from "../../api/util";

type UsersProps = {
  initAccountList: Account[];
  initChatRoomList: ChatRoom[];
};
export function Users({ initAccountList, initChatRoomList }: UsersProps) {
  const router = useRouter();
  const { currentUser, isLoading } = useAuthContext() as AuthContext;
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
          <ContentWrap
            key={`user-${uid}`}
            onClick={() => onClickUserHandler(uid, email, name, image)}
          >
            <ImageWrap>
              <Image width={40} height={40} src={image || profile} />
            </ImageWrap>
            <InfoWrap>
              <Name>{name}</Name>
              <Email>{email}</Email>
            </InfoWrap>
          </ContentWrap>
        ))}
      <Empty />
    </Container>
  );
}

const Container = tw.div`
flex flex-col w-full mb-2 h-full
`;
const ContentWrap = tw.div`
w-full border-b-2 py-8 px-4 border-line flex justify-start items-center h-16 hover:cursor-pointer hover:bg-hover
`;
const ImageWrap = tw.div`
flex justify-center items-center bg-gray-300 rounded-full w-12 h-12 overflow-hidden
`;
const InfoWrap = tw.div`
flex flex-col pl-4
`;
const Name = tw.span`
ml-1 font-bold tracking-wide
`;
const Email = tw.span`
ml-1 text-sm tracking-wide text-gray-300/70 max-w-[150px] overflow-hidden text-ellipsis
`;
