import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import tw from "tailwind-styled-components";
import { AuthContext, useAuthContext } from "../provider/AuthProvider";
import Nav from "./Nav";

type ContentWrapProps = {
  children: ReactNode;
};

function ContentWrap({ children }: ContentWrapProps) {
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

export default React.memo(ContentWrap);

const Div = tw.div`
flex flex-col h-full
`;
const Title = tw.h1`
pt-24 py-12 text-center text-8xl font-bold
`;
const Wrap = tw.div`
flex flex-1 overflow-x-hidden overflow-y-hidden rounded-xl
`;
const ComponentWrap = tw.div`
flex flex-col bg-gray-400/25 max-w-full max-h-full w-full
`;
const Content = tw.div`
flex flex-col w-full mb-2 h-full
`;
