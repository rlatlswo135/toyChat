import React from "react";
import PuffLoader from "react-spinners/PuffLoader";

type SpinnerProps = {
  className?: string;
  size?: number | string;
  fontSize?: string;
  height?: string;
  text: string | null;
};
function Spinner({
  fontSize = "text-5xl",
  className = "",
  size = 300,
  text = "Loading...",
  height = "h-full",
}: SpinnerProps) {
  return (
    <div
      className={`flex flex-col justify-center items-center w-full ${height} ${className}`}
    >
      <PuffLoader color="white" size={size} />
      <span className={`font-bold ${fontSize} pt-12 pl-6`}>{text}</span>
    </div>
  );
}

export { Spinner };
