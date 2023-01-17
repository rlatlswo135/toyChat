import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import tw from "tailwind-styled-components";
import profile from "../public/images/default.png";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { createAccount } from "../api/auth";
import { ErrorMsg, MSG_PWD_CONFIRM } from "../constants/error";
import { HomeContentDiv, Error, HomeDiv, HomeTitleDiv } from "./Home";
import { ButtonWrap, MyForm } from "./MyForm";
import { Spinner } from "./Spinner";
import { makeErrorMsg } from "./util/error";

type RegisterInfo = {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
};

function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<ErrorMsg>(null);
  const [registerInfo, setRegisterInfo] = useState<RegisterInfo>({
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
  });

  const formData = useMemo(() => {
    const { email, password, passwordConfirm, name } = registerInfo;

    return [
      { name: "email", value: email },
      { name: "name", value: name },
      {
        name: "password",
        value: password,
        type: "password",
        placeHolder: "password (최소 6자 이상)",
      },
      { name: "passwordConfirm", value: passwordConfirm, type: "password" },
    ];
  }, [registerInfo]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterInfo((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setErrMsg(null);
    setLoading(true);
    const { email, password, passwordConfirm, name } = registerInfo;

    if (password !== passwordConfirm) {
      setErrMsg(MSG_PWD_CONFIRM);
      setLoading(false);
      return;
    }
    const register = await createAccount(email, name, password);
    if (typeof register === "string") {
      makeErrorMsg(register, setErrMsg);
      setLoading(false);
      return;
    }
    setLoading(false);
    router.push("/home");
  };

  // Todo 가입 중복시 에러메시지
  // {loading && <Spinner className="pt-5" size={100} text="SignUp..." />}
  if (loading) {
    return <Spinner className="pt-5" size={200} text="Sign Up..." />;
  }
  return (
    <HomeDiv>
      <Head>toyChat</Head>
      <HomeContentDiv>
        <ImageWrap>
          <Image src={profile} layout="fill" />
        </ImageWrap>
        <HomeTitleDiv>Register</HomeTitleDiv>
        <MyForm
          formData={formData}
          changeHandler={changeHandler}
          submitHandler={submitHandler}
          submitText="Sign Up"
        >
          <ButtonWrap>
            <Link href="/home">
              <button className="w-full h-full">Go Home</button>
            </Link>
          </ButtonWrap>
        </MyForm>
        {loading && <Spinner className="pt-5" size={100} text="SignUp..." />}
        {errMsg && <Error>{errMsg}</Error>}
      </HomeContentDiv>
    </HomeDiv>
  );
}

export default React.memo(Register);

const ImageWrap = tw.div`
hidden relative w-24 h-24 p-5 rounded-full overflow-hidden
md:block md:w-40 md:h-40 xl:w-60 xl:h-60
`;
// sm:hidden xl:relative
