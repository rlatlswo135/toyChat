import React, { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";
import { AiOutlineEdit } from "react-icons/ai";
import tw from "tailwind-styled-components";
import Image from "next/image";
import { isEqual } from "lodash";
import profile from "../public/images/default.png";
import { AuthContext, useAuthContext } from "../provider/AuthProvider";
import { makeErrorMsg } from "./util/error";
import { deleteAccount } from "../api/auth";
import { Spinner } from "./Spinner";
import { MyPage } from "../pages/my";
import { LIMIT } from "../constants/image";
import { EditAndSave } from "./EditAndSave";
import { changeAccountInfo, ImageType } from "../api/store";
import { ErrorMsg } from "../constants/error";

type MyProps = MyPage;
export function My({ docId }: MyProps) {
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  console.log("````````````docId````````````", docId);
  const { currentUser } = useAuthContext() as AuthContext;

  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const [name, setName] = useState<string>(currentUser?.name || "");
  const [image, setImage] = useState<ImageType>(currentUser?.image || null);

  const [loading, setLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<ErrorMsg>(null);

  const isEdit = !isEqual(
    { image: currentUser?.image, name: currentUser?.name },
    { image, name }
  );

  // ** event handler
  const onClickDelete = useCallback(() => setIsDelete(true), []);
  const onClickEditImage = useCallback(() => {
    if (imageRef.current) {
      imageRef.current?.click();
    }
  }, []);

  const startEditMode = useCallback(() => {
    setEditMode(true);
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, []);
  // ** cancel
  const cancelDelete = useCallback(() => setIsDelete(false), []);
  const cancelEdit = useCallback(() => {
    setImage(currentUser?.image || null);
    setName(currentUser?.name || "");
  }, [currentUser]);

  // ** confirm
  const confirmDelete = useCallback(async () => {
    if (currentUser) {
      setLoading(true);

      if (docId) {
        const result = await deleteAccount(docId);
        if (typeof result === "string") {
          makeErrorMsg(result, setErrMsg);
          return;
        }
      }
      setLoading(false);
      setIsDelete(false);
    }
  }, [currentUser]);

  const confirmEdit = async () => {
    if (currentUser) {
      if (docId) {
        const result = await changeAccountInfo(docId, {
          image,
          name,
        });

        if (typeof result === "string") {
          makeErrorMsg(result, setErrMsg);
          return;
        }
        router.push("/users");
      }
    }
  };

  // Todo: Image를 수정후 uid를 넣어서 해줘야하니까 로그인 이후 마이페이지에서 수정하게끔 바꿔보자
  const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file?.length) {
      if (file[0].size > LIMIT) {
        console.error("사이즈");
        return;
      }
      const src = URL.createObjectURL(file[0]);
      setImage(src);
    }
  };

  return (
    <>
      <Container>
        <Wrap>
          <ImageWrap className="group/edit" onClick={onClickEditImage}>
            <Image src={image || profile} layout="fill" className="border-2" />
            <EditImage>Edit</EditImage>
          </ImageWrap>
          <Edit onClick={startEditMode} title="edit_name">
            <AiOutlineEdit size="100%" />
          </Edit>
          <div className="flex flex-col items-center justify-center">
            <NameInput
              title="edit_name_input"
              type="text"
              readOnly={!editMode}
              maxLength={15}
              value={name}
              onChange={(e) => setName(e.target.value)}
              ref={(ele) => {
                if (ele) {
                  nameRef.current = ele;
                }
              }}
            />
          </div>
          <Email>{currentUser?.email}</Email>
          {!loading && <Delete onClick={onClickDelete}>Delete</Delete>}
          {isEdit && (
            <EditAndSave yesHandler={confirmEdit} noHandler={cancelEdit} />
          )}
          {isDelete && (
            <EditAndSave yesHandler={confirmDelete} noHandler={cancelDelete} />
          )}
          {errMsg && <div className="pt-10">{errMsg}</div>}
        </Wrap>
        {loading && <Spinner text={null} size={100} />}
      </Container>
      <input
        type="file"
        minLength={6}
        accept="image/png,image/jpeg"
        style={{ display: "none" }}
        onChange={(e) => changeImage(e)}
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

const Container = tw.div`
  relative flex flex-col flex-1 items-center py-52 overflow-y-hidden
`;
const Wrap = tw.div`
relative flex flex-col items-center
`;
const ImageWrap = tw.div`
relative border-2 border-line relative w-60 h-60 rounded-full mb-8
hover:bg-hover hover:cursor-pointer
flex justify-center items-center overflow-hidden
`;
const NameInput = tw.input`
font-bold tracking-wide text-5xl mb-4 
bg-none outline-none text-white bg-transparent text-center
`;
const Email = tw.p`
text-time mb-4 text-xl
`;
const Delete = tw.button`
py-6 mb-6 px-12 bg-gray-400 rounded-xl text-xl font-bold hover:bg-hover
`;
const Edit = tw.button`
flex items-center justify-center absolute top-[48%] right-[25%] w-8 h-8
`;
const EditImage = tw.p`
invisible absolute top-[40%] text-4xl z-50 group-hover/edit:visible
`;
