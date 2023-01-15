import React from "react";
import tw from "tailwind-styled-components";

export function Empty() {
  return (
    <Container>
      <p>Empty</p>
    </Container>
  );
}

const Container = tw.div`
flex flex-1 items-center justify-center text-5xl opacity-30
`;
