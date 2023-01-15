import React from "react";
import tw from "tailwind-styled-components";
import Image, { StaticImageData } from "next/image";

type ProfileProps = {
  onClick: () => void;
  src: StaticImageData | string;
  name: string;
  email: string;
  size: number | string;
  padding?: number | string;
};

function Profile({
  onClick,
  src,
  name,
  email,
  size,
  padding = 4,
}: ProfileProps) {
  return (
    <ContentWrap onClick={onClick} padding={padding}>
      <ImageWrap>
        <Image width={size} height={size} src={src} />
      </ImageWrap>
      <InfoWrap>
        <Name>{name}</Name>
        <Email>{email}</Email>
      </InfoWrap>
    </ContentWrap>
  );
}

export default Profile;

const ContentWrap = tw.div<{ padding: number | string }>`
${({ padding }) =>
  typeof padding === "string" ? `px-[${padding}]` : `px-${padding}`}
w-full border-b-2 py-8 border-line flex justify-start items-center h-16 hover:cursor-pointer hover:bg-hover
`;
const ImageWrap = tw.div`
flex justify-center items-center bg-gray-300 rounded-full w-12 h-12 overflow-hidden
`;
const InfoWrap = tw.div`
flex flex-col pl-4
`;
const Name = tw.span`
ml-1 font-bold tracking-wide
`;
const Email = tw.span`
ml-1 text-sm tracking-wide text-gray-300/70 max-w-[150px] overflow-hidden text-ellipsis
`;
