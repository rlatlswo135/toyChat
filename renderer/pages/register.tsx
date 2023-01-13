import React, { useRef, useCallback, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import tw from "tailwind-styled-components";
import { MyForm } from "../components/MyForm";
import { createAccount, fbAuth } from "../api/auth";
import profile from "../public/images/default.png";
import { AiFillCamera } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { LIMIT } from "../constants/image";

type RegisterInfo = {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
  image: string;
};

export default function register() {
  const router = useRouter();
  const imageRef = useRef<HTMLInputElement | null>(null);
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
      { name: "password", value: password, type: "password" },
      { name: "passwordConfirm", value: passwordConfirm, type: "password" },
    ];
  }, [registerInfo]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterInfo((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { email, password, passwordConfirm, name } = registerInfo;
    if (password !== passwordConfirm) {
      console.log("같지않음");
      return;
    }
    await createAccount(fbAuth, email, name, password);
    router.push("/home");
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

  const resetImage = useCallback(
    () => setRegisterInfo((prev) => ({ ...prev, image: "" })),
    []
  );

  // ! 비밀번호 최소 6자 이상으로 해야함
  // ! 가입 중복시 에러메시지
  return (
    <>
      <Head>toyChat</Head>
      <RegisterDiv>
        <div className="relative border-2 rounded-full w-60 h-60 p-5">
          <Image src={profile} className="w-full h-full rounded-full" />
          {/* 이미지 바꾸는 부분 */}
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
      <input
        type="file"
        style={{ display: "none" }}
        onChange={(e) => setImage(e)}
        placeholder="image"
        ref={(ele) => {
          if (ele) {
            imageRef.current = ele;
          }
        }}
      />
    </>
  );
}

const TitleDiv = tw.div`
  p-12 text-7xl font-bold
`;

const RegisterDiv = tw.div`
  flex flex-col justify-center items-center h-full
`;
