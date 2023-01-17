import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import tw from "tailwind-styled-components";
import { logOutAccount } from "../api/auth";
import { AuthContext, useAuthContext } from "../provider/AuthProvider";
import Link from "next/link";

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
      case "/my":
        setTitle("마이페이지");
        break;
      default:
        setTitle("메뉴");
    }
  }, [router.pathname]);

  const logOutHandler = useCallback(async () => {
    if (currentUser) {
      const result = await logOutAccount(currentUser.email);
      if (typeof result === "string") {
        return;
      }
    }
  }, [currentUser]);

  return (
    <Container>
      <MenuTitle>{title}</MenuTitle>
      <MenuWrap className="flex">
        <Link
          href={{
            pathname: "/my",
            query: {
              id: currentUser?.uid,
            },
          }}
        >
          <Menu>
            <FaUserCircle size={20} className="mr-1" />
            <span>MyPage</span>
          </Menu>
        </Link>
        <Menu onClick={logOutHandler}>
          <BiLogOut size={20} className="mr-1" />
          <span>Logout</span>
        </Menu>
      </MenuWrap>
    </Container>
  );
}

export default React.memo(Header);

const Container = tw.div`
flex justify-evenly pt-2 items-center
sm:p-4 sm:justify-between
`;
const MenuTitle = tw.h1`
font-bold text-lg
sm:text-xl
`;
const MenuWrap = tw.ul`
flex
`;
const Menu = tw.li`
flex items-center p-2 hover:cursor-pointer hover:bg-hover rounded-xl
`;
