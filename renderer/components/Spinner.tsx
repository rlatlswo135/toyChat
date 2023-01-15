import React, { ReactNode } from "react";
import PuffLoader from "react-spinners/PuffLoader";

type SpinnerProps = {
  className?: string;
  size?: number | string;
  fontSize?: string;
  height?: string;
};
function Spinner({
  fontSize = "text-5xl",
  className = "",
  size = 300,
  height = "h-full",
}: SpinnerProps) {
  return (
    <div
      className={`flex flex-col justify-center items-center w-full ${height} ${className}`}
    >
      <PuffLoader color="white" size={size} />
      <span className={`font-bold ${fontSize} pt-12 pl-6`}>Loading...</span>
    </div>
  );
}

export { Spinner };
