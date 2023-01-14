import React, { useCallback } from "react";
import { useRouter } from "next/router";
import tw from "tailwind-styled-components";
import { logOutAccount, fbAuth } from "../api/auth";
import { AuthContext, useAuthContext } from "../provider/AuthProvider";

function Header() {
  const router = useRouter();
  const { currentUser } = useAuthContext() as AuthContext;

  const logOutHandler = useCallback(async () => {
    console.log("````````````currentUser````````````", currentUser);
    if (currentUser) {
      const result = await logOutAccount(fbAuth, currentUser.email);
      if (typeof result === "string") {
        return;
      }
      router.push("/home");
    }
  }, [currentUser]);

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
