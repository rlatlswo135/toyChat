import Link from "next/link";
import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import tw from "tailwind-styled-components";
import { AuthContext, useAuthContext } from "../provider/AuthProvider";
import { Nav } from "./Nav";

type ContentWrapProps = {
  children: ReactNode;
};

export function ContentWrap({ children }: ContentWrapProps) {
  const router = useRouter();
  const { currentUser, isLoading } = useAuthContext() as AuthContext;

  useEffect(() => {
    if (!currentUser) {
      router.push("/home");
    }
  }, []);

  return (
    <Div>
      <div className="flex flex-col w-full justify-end">
        <Title>Welcom to Toy Chat</Title>
      </div>
      <Wrap>
        <Nav />
        <ComponentWrap>
          {/* <Header /> */}
          <Content>{children}</Content>
        </ComponentWrap>
      </Wrap>
    </Div>
  );
}

const Div = tw.div`
flex flex-col h-full
`;
const Title = tw.h1`
pt-24 py-12 text-center text-8xl font-bold
`;
const Wrap = tw.div`
flex flex-1 overflow-x-hidden rounded-xl
`;
const ComponentWrap = tw.div`
flex flex-col bg-gray-400/25 max-w-full max-h-full w-full overflow-y-auto
`;
const Content = tw.div`
flex flex-col w-full mb-2 h-full
`;
