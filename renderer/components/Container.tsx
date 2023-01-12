import React, { ReactNode } from "react";
import tw from "tailwind-styled-components";

type ContainerProps = {
  children: ReactNode;
};

export function Container({ children }: ContainerProps) {
  return <Div>{children}</Div>;
}

const Div = tw.div`
    h-screen w-screen border-2
`;
