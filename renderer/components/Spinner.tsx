import React, { ReactNode } from "react";
import PuffLoader from "react-spinners/PuffLoader";

type SpinnerProps = {
  className?: string;
  text?: string;
  size?: number | string;
  children?: ReactNode;
};
function Spinner({ className = "", size = 300 }: SpinnerProps) {
  return (
    <div
      className={`flex flex-col justify-center items-center w-full h-full ${className}`}
    >
      <PuffLoader color="white" size={size} />
      <span className="font-bold text-5xl pt-12 pl-6">Loading...</span>
    </div>
  );
}

export { Spinner };
