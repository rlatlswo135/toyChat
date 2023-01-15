import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import tw from "tailwind-styled-components";
import { logOutAccount, fbAuth } from "../api/auth";
import { AuthContext, useAuthContext } from "../provider/AuthProvider";

function Header() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const { currentUser } = useAuthContext() as AuthContext;

  useEffect(() => {
    switch (router.pathname) {
      case "/users":
        setTitle("유저");
        break;
      case "/chatlist":
        setTitle("채팅");
        break;
      default:
        setTitle("메뉴");
    }
  }, [router.pathname]);

  const logOutHandler = useCallback(async () => {
    if (!currentUser) {
      router.push("/home");
      return;
    }

    const result = await logOutAccount(fbAuth, currentUser.email);
    if (typeof result === "string") {
      return;
    }
    router.push("/home");
  }, [currentUser]);

  return (
    <div className="flex justify-between p-4">
      <MenuTitle>{title}</MenuTitle>
      <MenuWrap className="flex">
        <Menu onClick={logOutHandler}>Logout</Menu>
      </MenuWrap>
    </div>
  );
}

export default Header;

const MenuTitle = tw.h1`
font-bold text-xl
`;
const MenuWrap = tw.ul`
  flex
`;
const Menu = tw.li`
p-2 hover:cursor-pointer hover:bg-hover rounded-xl
`;
