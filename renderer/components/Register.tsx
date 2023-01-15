import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import profile from "../public/images/default.png";
import { useRouter } from "next/router";
import React, { useMemo, useRef, useState } from "react";
import { createAccount, fbAuth } from "../api/auth";
import { MSG_PWD_CONFIRM } from "../constants/error";
import { LIMIT } from "../constants/image";
import { HomeContentDiv, Error, HomeDiv, HomeTitleDiv } from "./Home";
import { ButtonWrap, MyForm } from "./MyForm";
import { Spinner } from "./Spinner";
import { makeErrorMsg } from "./util/error";

type RegisterInfo = {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
  image: string;
};

export function Register() {
  const router = useRouter();
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [registerInfo, setRegisterInfo] = useState<RegisterInfo>({
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
    image: "",
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
    const result = await createAccount(fbAuth, email, name, password);
    if (typeof result === "string") {
      makeErrorMsg(result, setErrMsg);
      setLoading(false);
      return;
    }
    setLoading(false);
    router.push("/chatlist");
  };

  // Todo: Image를 수정후 uid를 넣어서 해줘야하니까 로그인 이후 마이페이지에서 수정하게끔 바꿔보자
  const setImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file?.length) {
      console.log("````````````file[0]````````````", file[0]);
      const { name, type, size } = file[0];
      const permitExt = ["image/jpeg", "image/jpg", "image/png"];
      if (!permitExt.includes(type) || size > LIMIT) {
        console.error("확장자");
        return;
      }
      setRegisterInfo((prev) => ({ ...prev, image: name }));
    }
  };
  // Todo 가입 중복시 에러메시지
  return (
    <HomeDiv>
      <Head>toyChat</Head>
      <HomeContentDiv>
        <div className="relative rounded-full w-60 h-60 p-5">
          <Image src={profile} className="w-full h-full rounded-full" />
          {/* {registerInfo.image && (
              <button
                title="cancel"
                className="absolute left-[95%] w-7 h-7 z-50"
                onClick={resetImage}
              >
                <MdCancel className="w-full h-full" />
              </button>
            )}
            <button
              onClick={() => imageRef.current?.click()}
              title="icon"
              className="absolute w-10 h-10 top-[90%] z-50"
            >
              <AiFillCamera className="w-full h-full" />
            </button> */}
        </div>
        <HomeTitleDiv>Register</HomeTitleDiv>
        <MyForm
          formData={formData}
          changeHandler={changeHandler}
          submitHandler={submitHandler}
          submitText="Sign Up"
        />
        <ButtonWrap>
          <Link href="/home">
            <button className="w-full h-full">Go Home</button>
          </Link>
        </ButtonWrap>
        {loading && <Spinner className="pt-5" />}
        {errMsg && <Error>{errMsg}</Error>}
      </HomeContentDiv>
      <input
        type="file"
        minLength={6}
        style={{ display: "none" }}
        onChange={(e) => setImage(e)}
        placeholder="image"
        ref={(ele) => {
          if (ele) {
            imageRef.current = ele;
          }
        }}
      />
    </HomeDiv>
  );
}
