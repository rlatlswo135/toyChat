import React, { useMemo, useState } from "react";
import tw from "tailwind-styled-components";
import Head from "next/head";
import Link from "next/link";
import { MyForm } from "../components/MyForm";

type LoginInfo = {
  email: string;
  password: string;
};

function Home() {
  // 커스텀훅으로 changeHandler까지 해도 될듯
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: "",
    password: "",
  });

  const formData = useMemo(() => {
    const { email, password } = loginInfo;

    return [
      { name: "ID", value: email },
      { name: "PW", value: password },
    ];
  }, [loginInfo]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Head>toyChat</Head>
      <LoginDiv>
        <TitleDiv>Toy - Chat</TitleDiv>
        <MyForm
          formData={formData}
          changeHandler={changeHandler}
          submitHandler={() => console.log("submit")}
        />
        <div>
          <button>Login</button>
        </div>
        <div>
          <Link href="/register">
            <button>Register</button>
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
