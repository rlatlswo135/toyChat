import React, { ReactNode } from "react";
import tw from "tailwind-styled-components";

type ContainerProps = {
  children: ReactNode;
};

export function Container({ children }: ContainerProps) {
  return <div className="h-screen w-screen">{children}</div>;
}
