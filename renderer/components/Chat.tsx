import React, { useState } from "react";
import tw from "tailwind-styled-components";

type ChatProps = {
  roomId: string;
};

function Chat({ roomId }: ChatProps) {
  const [chat, setChat] = useState<string>("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setChat(e.target.value);
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-1">chat</div>
      <form className="p-1">
        <input
          className="rounded-xl w-[90%] h-10 px-5"
          placeholder="Put Your Message...."
          type="text"
          value={chat}
          onChange={(e) => changeHandler(e)}
        />
        <button className="text-m w-[10%] font-bold bg-gray-500 h-full rounded-xl">
          Send
        </button>
      </form>
    </div>
  );
}

export { Chat };
