import React, { useEffect, useState, useLayoutEffect } from "react";
import tw from "tailwind-styled-components";
import { useCollectionState } from "../api/hook";
import { Account } from "../api/store";

function UserList() {
  const [accountList, setAccountList] = useCollectionState<Account>("accounts");

  // Todo width 가변인거 수정
  return (
    <Div>
      <p className="text-center text-xl font-bold border-b-2 pb-4 mb-6">
        User List
      </p>
      {accountList
        .sort((a, b) => Number(b.isLogin) - Number(a.isLogin))
        .map(({ uid, isLogin, email, name }) => (
          <User key={`uid-${uid}`} $login={isLogin}>
            {name}
          </User>
        ))}
    </Div>
  );
}

export { UserList };

const Div = tw.div`
flex p-4 flex-col h-full flex-grow-[0.5]
`;

type User = {
  $login: boolean;
};

const User = tw.div<User>`
    m-1 text-center
    ${(props) => (props.$login ? "text-white" : "text-logout")}
`;
