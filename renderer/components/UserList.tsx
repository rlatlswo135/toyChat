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

  return (
    <Div>
      <p className="text-center text-xl font-bold border-b-2 pb-4 mb-6">
        User-List
      </p>
      {accountList.map(({ uid, isLogin, email }) => (
        <User key={`uid-${uid}`} $login={isLogin}>
          {email}
        </User>
      ))}
    </Div>
  );
}

export { UserList };

const Div = tw.div`
flex p-4 flex-col h-full
`;

type User = {
  $login: boolean;
};

const User = tw.div<User>`
    m-1
    ${(props) => (props.$login ? "text-white" : "text-logout")}
`;
