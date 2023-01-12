import React, { useEffect, useState, useLayoutEffect } from "react";
import tw from "tailwind-styled-components";
import { Account, getAccountList } from "../api/store";

function UserList() {
  const [accountList, setAccountList] = useState<Account[]>([]);

  useEffect(() => {
    async function fetchAndSet() {
      const data = await getAccountList();
      if (data) {
        const sort = data.sort((a, b) => Number(b.isLogin) - Number(a.isLogin));
        setAccountList(sort);
      }
    }
    fetchAndSet();
  }, []);

  // Todo width 가변인거 수정
  return (
    <Div>
      <p className="text-center text-xl font-bold border-b-2 pb-4 mb-6">
        User List
      </p>
      {accountList.map(({ uid, isLogin, email, name }) => (
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
