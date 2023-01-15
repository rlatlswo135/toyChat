import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { isEqual } from "lodash";
import tw from "tailwind-styled-components";
import Image from "next/image";
import React, { useCallback } from "react";
import {
  Account,
  ChatRoom,
  getAccountList,
  getChatroomList,
  postChatRoom,
  User,
} from "../api/store";
import profile from "../public/images/default.png";
import { useCollectionState } from "../api/hook";
import { getNow } from "../api/util";
import { AuthContext, useAuthContext } from "../provider/AuthProvider";

type Users = {
  initAccountList: Account[];
  initChatRoomList: ChatRoom[];
};

// Todo 온라인 / 오프라인 나눠서 렌더 -> sort말고 filter로
export default function users({ initAccountList, initChatRoomList }: Users) {
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
      const users = [] as User[];
      if (uid && email && name && currentUser) {
        users.push({ ...currentUser });
        if (uid !== currentUser.uid) {
          users.push({ image, email, name, uid });
        }
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

  return (
    <Container>
      <MenuTitle>유저</MenuTitle>
      <p>나</p>
      <div>나담을박스</div>
      <MenuTitle>유저</MenuTitle>
      {accountList
        .sort((a, b) => Number(b.isLogin) - Number(a.isLogin))
        .map(({ uid, isLogin, email, name, image }) => {
          return (
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
          );
        })}
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const initAccountList = await getAccountList();
  const initChatRoomList = await getChatroomList();

  return {
    props: {
      initAccountList,
      initChatRoomList,
    },
  };
};

const Container = tw.div`
flex flex-col w-full  
`;
const MenuTitle = tw.p`
p-4 border-t-2 border-line font-bold text-xl
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
