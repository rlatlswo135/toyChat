import React from "react";
import tw from "tailwind-styled-components";

function ChatList() {
  return (
    <Div>
      <div className="flex flex-col h-full items-center bg-gray-400/25"></div>
    </Div>
  );
}

export { ChatList };

const Div = tw.div`
flex-1 h-full grow-[1] px-10 py-4  
`;
