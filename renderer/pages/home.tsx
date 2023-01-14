import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Head from "next/head";
import Link from "next/link";
import { MyForm } from "../components/MyForm";
import { fbAuth, loginAccount } from "../api/auth";
import { useRouter } from "next/router";
import { ButtonWrap } from "../components/MyForm";
import { Spinner } from "../components/Spinner";
import {
  AUTH_NOTFOUND,
  AUTH_REQUEST_FAIL,
  AUTH_WRONG_PWD,
} from "../constants/error";
import { AuthContext, useAuthContext } from "../provider/AuthProvider";
import { makeErrorMsg } from "../components/util/error";

type LoginInfo = {
  email: string;
  password: string;
};

function Home() {
  // Todo 계정 틀릴시 에러메시지
  const { isLoading } = useAuthContext() as AuthContext;
  const [loading, setLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);
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
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const signIn = async (e: React.SyntheticEvent) => {
    setLoading(true);
    setErrMsg(null);
    e.preventDefault();
    const { email, password } = loginInfo;
    const result = await loginAccount(fbAuth, email, password);

    console.log("````````````result````````````", result);
    if (typeof result === "string") {
      makeErrorMsg(result, setErrMsg);
    }
    setLoading(false);
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
        {(loading || isLoading) && <Spinner className="pt-5" />}
        {errMsg && <Error>{errMsg}</Error>}
      </HomeContentDiv>
    </HomeDiv>
  );
}

export default Home;

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
