import React from "react";
import tw from "tailwind-styled-components";
import Image, { StaticImageData } from "next/image";

type ProfileProps = {
  onClick: () => void;
  src: StaticImageData | string;
  name: string;
  email: string;
  isLogin: boolean;
  imgWrapSize?: number;
  padding?: number;
  height?: number | string;
  className?: string;
};

function Profile({
  onClick,
  src,
  name,
  email,
  isLogin,
  padding = 4,
  imgWrapSize = 10,
  height = 10,
  className = "",
}: ProfileProps) {
  return (
    <ContentWrap
      onClick={onClick}
      $padding={padding}
      $height={height}
      className={className}
    >
      <ImageWrap $size={imgWrapSize}>
        <Image layout="fill" src={src} />
      </ImageWrap>
      <InfoWrap>
        <Name $login={isLogin}>{name}</Name>
        <Email>{email}</Email>
      </InfoWrap>
    </ContentWrap>
  );
}

export default Profile;

type Style = string | number;
const ContentWrap = tw.div<{ $padding: Style; $height: Style }>`
${({ $padding }) => `px-${$padding}`} ${({ $height }) => `h-${$height}`}
w-full border-b-2 py-8 border-line flex justify-start items-center hover:cursor-pointer hover:bg-hover
`;
const ImageWrap = tw.div<{ $size: Style }>`
${({ $size }) => `w-${$size} h-${$size}`}
relative flex justify-center items-center bg-gray-300 rounded-full overflow-hidden
`;
const InfoWrap = tw.div`
flex flex-col pl-4
`;
const Name = tw.span<{ $login: boolean }>`
ml-1 font-bold tracking-wide ${({ $login }) => ($login ? "" : "text-logout")}
`;
const Email = tw.span`
ml-1 text-sm tracking-wide text-gray-300/70 max-w-[150px] overflow-hidden text-ellipsis
`;
