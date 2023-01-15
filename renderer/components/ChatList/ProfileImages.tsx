import React from "react";
import Image from "next/image";
import tw from "tailwind-styled-components";
import profile from "../../public/images/default.png";
import { User } from "../../api/store";

type Users = {
  users: User[];
};
function GroupChat({ users }: Users) {
  return (
    <GroupImages>
      {users.map(({ image }, idx) => {
        const src = !image ? profile : image;
        return (
          <Image
            key={`groupImage-${idx}`}
            src={src}
            width="100%"
            height="100%"
          />
        );
      })}
    </GroupImages>
  );
}

function UserChat({ users }: Users) {
  return (
    <div className="relative w-full h-full">
      {users.map(({ image }, idx) => {
        const src = !image ? profile : image;
        return (
          <DoubleWrap idx={idx} key={`users-img-${idx}`}>
            <Image src={src} width="100%" height="100%" />
          </DoubleWrap>
        );
      })}
    </div>
  );
}

function SingleChat({ users }: Users) {
  const src = users[0].image ? users[0].image : profile;
  return (
    <SingleWrap>
      <Image src={src} width="100%" height="100%" />
    </SingleWrap>
  );
}

function ProfileImages({ users }: Users) {
  if (users.length === 1) return <SingleChat users={users} />;
  if (users.length === 2) return <UserChat users={users} />;
  return <GroupChat users={users} />;
}

export { ProfileImages };

const SingleWrap = tw.div`
relative flex justify-center items-center w-full h-full rounded-full overflow-hidden bg-gray-400/20
`;

const DoubleWrap = tw.div<{ idx: number }>`
absolute bg-gray-500 rounded-xl overflow-hidden w-2/3 h-2/3
${({ idx }) => (idx === 1 ? "top-2/4 right-0 z-50" : "top-0 left-0")}
`;
const GroupImages = tw.div`
grid grid-cols-2 grid-rows-auto gap-2 w-full h-full mr-4 rounded-xl
`;
