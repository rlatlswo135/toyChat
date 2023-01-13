import React, { Dispatch, SetStateAction, useState } from "react";
import tw from "tailwind-styled-components";

type ChatProps = {
  roomId: string;
  setRoomId: Dispatch<SetStateAction<string>>;
};

function Chat({ roomId, setRoomId }: ChatProps) {
  const [chat, setChat] = useState<string>("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setChat(e.target.value);

  const submitHandler = (e: React.SyntheticEvent) => {
    console.log("submit");
    e.preventDefault();
    setChat("");
  };

  const exitChat = () => setRoomId("");

  return (
    <div className="flex relative flex-col w-full h-full">
      <div className="flex-1">
        <button
          onClick={exitChat}
          className="absolute top-2 left-[97%] text-xl font-bold opacity-50 z-50 hover:text-gray-900"
        >
          x
        </button>
      </div>
      <form className="p-1" onSubmit={submitHandler}>
        <input
          className="rounded-xl w-[90%] h-10 px-5 bg-gray-400 outline-none"
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
