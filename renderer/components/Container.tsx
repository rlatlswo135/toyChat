import React, { ReactNode } from "react";
import tw from "tailwind-styled-components";

type ContainerProps = {
  children: ReactNode;
};

export function Container({ children }: ContainerProps) {
  return (
    <div
      id="container"
      className="flex flex-col max-h-screen h-screen w-screen overflow-auto"
    >
      {children}
    </div>
  );
}
