import React, { Dispatch, SetStateAction, useState } from "react";
import tw from "tailwind-styled-components";
import Image from "next/image";
import profile from "../public/images/default.png";

interface MyChatProps {
  content: string;
  time: Date;
}
export function MyChat({ content, time }: MyChatProps) {
  return (
    <div className="flex justify-end pt-2 items-end">
      <span className="text-sm text-gray-300 mr-2">00:00</span>
      <span className="bg-gray-400 rounded-lg px-3 py-1.5">{content}</span>
    </div>
  );
}

interface OtherChatProps extends MyChatProps {
  img: string | null;
}
export function OtherChat({ content, time, img }: OtherChatProps) {
  return (
    <div className="flex justify-start pt-2 items-end">
      <div className="pb-4">
        <Image
          src={!img ? profile : img}
          height={35}
          width={35}
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col ml-3">
        <p className="text-[0.9em] font-bold mb-2 tracking-wide">KIM</p>
        <span className="bg-gray-500 rounded-lg px-3 py-1.5">{content}</span>
      </div>
      <span className="text-sm text-gray-300 ml-2">00:00</span>
    </div>
  );
}
