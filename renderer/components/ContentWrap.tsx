import Link from "next/link";
import React, { ReactNode } from "react";
import tw from "tailwind-styled-components";
import Header from "./Header";
import { Nav } from "./Nav";

type ContentWrapProps = {
  children: ReactNode;
};

export function ContentWrap({ children }: ContentWrapProps) {
  return (
    <Div>
      <Header />
      <Wrap>
        <Nav />
        <ComponentWrap>{children}</ComponentWrap>
      </Wrap>
    </Div>
  );
}

const Div = tw.div`
flex flex-col h-full
`;

const Wrap = tw.div`
flex flex-1 overflow-x-hidden rounded-xl
`;
const ComponentWrap = tw.div`
flex bg-gray-400/25 max-w-full max-h-full w-full overflow-y-auto
`;
