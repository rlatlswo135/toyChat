import React from "react";
import tw from "tailwind-styled-components";

function Header() {
  return (
    <HeaderWrap>
      <IconWrap>아이콘</IconWrap>
      <ContentWrap>
        <Content>컨텐츠들</Content>
        <Content>컨텐츠들</Content>
      </ContentWrap>
    </HeaderWrap>
  );
}

export default Header;

const HeaderWrap = tw.header`
 flex border-blue-400 h-[7%] w-screen
`;

const IconWrap = tw.div`
h-full grow-[1] flex-4 
`;

const ContentWrap = tw.ul`
flex justify-evenly items-center h-full grow-[2] flex-1 
`;

const Content = tw.li`
h-full w-full  
`;
