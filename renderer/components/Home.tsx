import React, { useEffect, useState } from "react";
import Head from "next/head";
import tw from "tailwind-styled-components";
import Link from "next/link";
import { PuffLoader } from "react-spinners";
import { loginAccount } from "../api/auth";
import { ButtonWrap, MyForm } from "./MyForm";
import { checkError } from "./util/error";
import { useRouter } from "next/router";
import { ErrorMsg } from "../constants/error";

type LoginInfo = {
  email: string;
  password: string;
};

function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<ErrorMsg>(null);
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: "",
    password: "",
  });

  // 메모이제이션 해봤자 state라 바뀌니하나마나;
  const formData = [
    { name: "email", value: loginInfo.email },
    { name: "password", value: loginInfo.password, type: "password" },
  ];

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (errMsg) {
      setErrMsg(null);
    }
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const signIn = async (e: React.SyntheticEvent) => {
    setLoading(true);
    setErrMsg(null);
    e.preventDefault();
    const { email, password } = loginInfo;
    const result = await loginAccount(email, password);
    checkError(result, setErrMsg, setLoading);
  };

  return (
    <HomeDiv>
      <Head>toyChat</Head>
      <HomeContentDiv>
        <HomeTitleDiv>Toy - Chat</HomeTitleDiv>
        <MyForm
          formData={formData}
          changeHandler={changeHandler}
          submitHandler={signIn}
          submitText="Login"
        />
        <ButtonWrap>
          <Link href="/register">
            <button className="w-full h-full">Sign Up</button>
          </Link>
        </ButtonWrap>
        {loading && (
          <div className="relative top-5">
            <PuffLoader color="white" />
          </div>
        )}
        {errMsg && <Error>{errMsg}</Error>}
      </HomeContentDiv>
    </HomeDiv>
  );
}

export default React.memo(Home);

export const HomeDiv = tw.div`
flex h-full flex-col justify-center items-center
`;

export const HomeTitleDiv = tw.div`
  p-12 text-7xl font-bold
`;

export const HomeContentDiv = tw.div`
flex flex-col items-center justify-center w-full h-full
`;

export const Error = tw.span`
text-xl pt-5 text-red-500 font-bold
`;
