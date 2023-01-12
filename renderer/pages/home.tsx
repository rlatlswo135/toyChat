import React, { useState } from "react";
import tw from "tailwind-styled-components";
import Head from "next/head";
import Link from "next/link";
import { MyForm } from "../components/MyForm";
import { fbAuth, loginAccount } from "../api/auth";
import { useRouter } from "next/router";
import { AuthContext, useAuthContext } from "../provider/AuthProvider";

type LoginInfo = {
  email: string;
  password: string;
};

function Home() {
  // 커스텀훅으로 changeHandler까지 해도 될듯
  const router = useRouter();
  const { setIsLoading } = useAuthContext() as AuthContext;

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

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    loginAccount(fbAuth, email, password);
    setIsLoading(true);
    router.push("/chatlist");
  };

  return (
    <>
      <Head>toyChat</Head>
      <LoginDiv>
        <TitleDiv>Toy - Chat</TitleDiv>
        <MyForm
          formData={formData}
          changeHandler={changeHandler}
          submitHandler={submitHandler}
          submitText="Login"
        />
        <div>
          <Link href="/register">
            <button>Register</button>
          </Link>
          <Link href="/chat">
            <button>Chat</button>
          </Link>
        </div>
      </LoginDiv>
    </>
  );
}

export default Home;

const TitleDiv = tw.div`
  p-12 text-7xl font-bold
`;

const LoginDiv = tw.div`
  flex flex-col border-4 justify-center items-center h-full
`;
