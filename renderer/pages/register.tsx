import React, { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import tw from "tailwind-styled-components";
import { MyForm } from "../components/MyForm";
import { createAccount, fbAuth } from "../api/auth";

export default function register() {
  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const formData = useMemo(() => {
    const { email, password, passwordConfirm } = registerInfo;

    return [
      { name: "email", value: email },
      { name: "password", value: password, type: "password" },
      { name: "passwordConfirm", value: passwordConfirm, type: "password" },
    ];
  }, [registerInfo]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterInfo((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { email, password, passwordConfirm } = registerInfo;
    if (password !== passwordConfirm) {
      console.log("같지않음");
      return;
    }
    createAccount(fbAuth, email, password);
  };

  // ! 비밀번호 최소 6자 이상으로 해야함
  // ! 가입 중복시 에러메시지
  return (
    <>
      <Head>toyChat</Head>
      <RegisterDiv>
        <TitleDiv>Register</TitleDiv>
        <MyForm
          formData={formData}
          changeHandler={changeHandler}
          submitHandler={submitHandler}
          submitText="Sign Up"
        />
        <div>
          <Link href="/home">
            <button>Go Home</button>
          </Link>
        </div>
      </RegisterDiv>
    </>
  );
}

const TitleDiv = tw.div`
  p-12 text-7xl font-bold
`;

const RegisterDiv = tw.div`
  flex flex-col border-4 justify-center items-center h-full
`;
