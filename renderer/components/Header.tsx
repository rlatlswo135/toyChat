import React, { useCallback } from "react";
import { useRouter } from "next/router";
import tw from "tailwind-styled-components";
import { logOutAccount, fbAuth } from "../api/auth";
import { AuthContext, useAuthContext } from "../provider/AuthProvider";
import Link from "next/link";

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
    <Container>
      <Menus>
        <button className="text-xl font-bold" onClick={logOutHandler}>
          Sign out
        </button>
      </Menus>
      <Title>Welcom to Toy Chat</Title>
    </Container>
  );
}

export default Header;

const Container = tw.header`
flex flex-col w-full justify-end
`;
const Menus = tw.div`
flex items-start justify-end h-20
`;
const Title = tw.h1`
pt-24 py-12 text-center text-8xl font-bold
`;
