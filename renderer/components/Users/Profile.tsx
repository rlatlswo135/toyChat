import React from "react";
import tw from "tailwind-styled-components";
import Image, { StaticImageData } from "next/image";

type ProfileProps = {
  onClick: () => void;
  src: StaticImageData | string;
  name: string;
  email: string;
  imgSize: number | string;
  imgWrapSize?: number | string;
  padding?: number | string;
  height?: number | string;
  className?: string;
};

function Profile({
  onClick,
  src,
  name,
  email,
  padding = 4,
  imgSize,
  imgWrapSize = 12,
  height = 12,
  className = "",
}: ProfileProps) {
  return (
    <ContentWrap
      onClick={onClick}
      padding={padding}
      height={height}
      className={className}
    >
      <ImageWrap size={imgWrapSize}>
        <Image width={imgSize} height={imgSize} src={src} />
      </ImageWrap>
      <InfoWrap>
        <Name>{name}</Name>
        <Email>{email}</Email>
      </InfoWrap>
    </ContentWrap>
  );
}

export default Profile;

type Style = string | number;
const ContentWrap = tw.div<{ padding: Style; height: Style }>`
${({ padding }) =>
  typeof padding === "string" ? `px-[${padding}]` : `px-${padding}`}
${({ height }) =>
  typeof height === "string" ? `h-[${height}]` : `h-${height}`}
w-full border-b-2 py-8 border-line flex justify-start items-center hover:cursor-pointer hover:bg-hover
`;
const ImageWrap = tw.div<{ size: Style }>`
${({ size }) =>
  typeof size === "string" ? `w-[${size}] h-[${size}]` : `w-${size} h-${size}`}
flex justify-center items-center bg-gray-300 rounded-full overflow-hidden
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
