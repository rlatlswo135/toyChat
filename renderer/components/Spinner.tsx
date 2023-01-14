import React from "react";
import PuffLoader from "react-spinners/PuffLoader";

type SpinnerProps = {
  className?: string;
};
function Spinner({ className = "" }: SpinnerProps) {
  return (
    <div className={className}>
      <PuffLoader color="white" />
    </div>
  );
}

export { Spinner };
