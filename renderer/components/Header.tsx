import React, { useCallback } from "react";
import tw from "tailwind-styled-components";
import { logOutAccount, fbAuth } from "../api/auth";
import { AuthContext, useAuthContext } from "../provider/AuthProvider";

function Header() {
  const { currentUser, setIsLoading, isLoading } =
    useAuthContext() as AuthContext;

  const logOutHandler = useCallback(() => {
    if (currentUser) {
      logOutAccount(fbAuth, currentUser.email);
    }
  }, []);

  return (
    <HeaderWrap>
      <button className="text-xl font-bold" onClick={logOutHandler}>
        Sign out
      </button>
    </HeaderWrap>
  );
}

export default Header;

const HeaderWrap = tw.header`
flex px-10 py-6 w-screen justify-end
`;
