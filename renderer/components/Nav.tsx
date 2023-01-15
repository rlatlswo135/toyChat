import Link from "next/link";
import React from "react";
import tw from "tailwind-styled-components";
import { FaUser } from "react-icons/fa";
import { BsFillChatFill } from "react-icons/bs";

function Nav() {
  return (
    <Container>
      <ul className="flex flex-col items-center justify-start flex-1">
        <Link href="/users">
          <Menu>
            <FaUser size={20} />
          </Menu>
        </Link>
        <Link href="/chatlist">
          <Menu>
            <BsFillChatFill size={20} />
          </Menu>
        </Link>
      </ul>
    </Container>
  );
}

export default React.memo(Nav);

const Container = tw.nav`
bg-zinc-800 flex flex-col justify-center h-full w-20
`;
const Menu = tw.li`
flex justify-center px-6 py-5 hover:cursor-pointer w-full hover:bg-hover
`;
