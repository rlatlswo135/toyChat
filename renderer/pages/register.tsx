import React, { useMemo, useState } from "react";
import Head from "next/head";
import tw from "tailwind-styled-components";
import { MyForm } from "../components/MyForm";
import Link from "next/link";

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
      { name: "password", value: password },
      { name: "passwordConfirm", value: passwordConfirm },
    ];
  }, [registerInfo]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Head>toyChat</Head>
      <RegisterDiv>
        <TitleDiv>Register</TitleDiv>
        <MyForm
          formData={formData}
          changeHandler={changeHandler}
          submitHandler={() => console.log("submit")}
        />
        <div>
          <button>Register</button>
        </div>
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
