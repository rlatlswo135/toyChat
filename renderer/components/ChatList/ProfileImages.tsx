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
          <Image key={`groupImage-${idx}`} src={src} className="rounded-xl" />
        );
      })}
    </GroupImages>
  );
}

function UserChat({ users }: Users) {
  return (
    <UserImages>
      {users.map(({ image }, idx) => {
        const src = !image ? profile : image;
        return (
          <div
            key={`userImage-${idx}`}
            className={idx === 1 ? "absolute top-1/3 right-0 z-50" : "absolute"}
          >
            <Image src={src} width={45} height={45} className="rounded-xl" />
          </div>
        );
      })}
    </UserImages>
  );
}

function SingleChat({ users }: Users) {
  const src = users[0].image ? users[0].image : profile;
  return (
    <div className="flex justify-center items-center w-20 h-20 rounded-xl mr-4">
      <Image src={src} width={60} height={60} className="rounded-xl" />
    </div>
  );
}

function ProfileImages({ users }: Users) {
  if (users.length === 1) return <SingleChat users={users} />;
  // if (users.length === 1) return <div>asd</div>;
  if (users.length === 2) return <UserChat users={users} />;
  return <GroupChat users={users} />;
}

export { ProfileImages };

const GroupImages = tw.div`
grid grid-cols-2 grid-rows-auto gap-2 w-20 h-20 mr-4 rounded-xl
`;

const UserImages = tw.div`
relative w-20 h-20 mr-4 rounded-xl
`;
