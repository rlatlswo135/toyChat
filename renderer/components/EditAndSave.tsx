import React from "react";
import tw from "tailwind-styled-components";

type EditAndSaveProps = {
  yesHandler: () => void;
  noHandler: () => void;
};
export const EditAndSave = ({ yesHandler, noHandler }: EditAndSaveProps) => {
  return (
    <div className="flex items-center">
      <Question>Sure?</Question>
      <Yes onClick={yesHandler}>Yes</Yes>
      <No onClick={noHandler}>No</No>
    </div>
  );
};

const Question = tw.p`
text-red-500 font-bold text-xl mr-4
`;
const Yes = tw.button`
py-2 px-4 text-xl font-bold hover:border-b-2 hover:text-red-500
`;
const No = tw.button`
py-2 px-4 text-xl font-bold hover:text-red-500 hover:border-b-2
`;
