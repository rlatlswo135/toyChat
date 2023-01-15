import React from "react";
import tw from "tailwind-styled-components";
import { ChatList } from "../components/ChatList/ChatList";
import { GetServerSideProps } from "next";
import { ChatRoom, getAccountList, getChatroomList } from "../api/store";
import { useCollectionState } from "../api/hook";
import { ProfileImages } from "../components/ChatList/ProfileImages";

type ChatList = {
  initChatRoomList: ChatRoom[];
};

function chatList({ initChatRoomList }: ChatList) {
  const [chatRoomList, setChatRoomList] = useCollectionState<ChatRoom>(
    "chatRoom",
    initChatRoomList
  );
  return (
    <Container>
      <MenuTitle>채팅</MenuTitle>
      {chatRoomList.map((chat) => {
        const { docId, users, createdAt, chatList } = chat;
        return (
          <ContentWrap>
            <div className="flex h-20">
              <div className="w-20 p-3.5">
                <ProfileImages users={users} />
              </div>
              <div className="flex flex-col justify-evenly">
                <p className="tracking-wide font-semibold text-lg">
                  {users
                    .map((item) => item.name)
                    .slice(0, 4)
                    .join(",")}
                  <span className="pl-2 pb-6 text-xs text-gray-400">
                    {users.length}
                  </span>
                </p>
                <p className="tracking-wide font-semibold text-sm">
                  마지막 챗컨텐츠
                </p>
              </div>
            </div>
            <span className="text-time pr-5">날짜</span>
          </ContentWrap>
        );
      })}
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const initChatRoomList = await getChatroomList();
  const initAccountList = await getAccountList();
  return {
    props: {
      initChatRoomList,
      initAccountList,
    },
  };
};

export default chatList;

const Container = tw.div`
flex flex-col w-full mb-2
`;
const MenuTitle = tw.p`
p-4 border-t-2 border-line font-bold text-xl
`;
const ContentWrap = tw.div`
w-full border-b-2 border-line flex justify-between items-center hover:cursor-pointer hover:bg-hover
`;
const InfoWrap = tw.div`
  
`;
