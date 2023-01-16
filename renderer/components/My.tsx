import React, { useCallback, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import profile from "../public/images/default.png";
import { AuthContext, useAuthContext } from "../provider/AuthProvider";
import { makeErrorMsg } from "./util/error";
import { deleteAccount } from "../api/auth";
import { Spinner } from "./Spinner";
import { MyPage } from "../pages/my";

type MyProps = MyPage;
export function My({ docId }: MyProps) {
  console.log("````````````docId````````````", docId);
  const router = useRouter();
  const { currentUser } = useAuthContext() as AuthContext;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const onClickDelete = useCallback(() => setIsOpen(true), []);

  const cancel = useCallback(() => setIsOpen(false), []);

  const deleteConfirm = useCallback(async () => {
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
      setIsOpen(false);
    }
  }, [currentUser]);

  return (
    <div className="relative flex flex-col flex-1 items-center py-52">
      {loading ? (
        <Spinner text={null} />
      ) : (
        <>
          <div className="w-60 h-60 overflow-hidden rounded-full mb-8">
            <Image src={profile} />
          </div>
          <p className="font-bold tracking-wide text-5xl mb-4">Name</p>
          <p className="text-time mb-4">{currentUser?.email}</p>
          <button
            onClick={onClickDelete}
            className="py-6 mb-6 px-12 bg-gray-400 rounded-xl text-xl font-bold hover:bg-hover"
          >
            Delete
          </button>
          {isOpen && (
            <div className="flex items-center">
              <p className="text-red-500 font-bold text-xl mr-4">Sure?</p>
              <button
                onClick={deleteConfirm}
                className="py-2 px-4 text-xl font-bold hover:border-b-2 hover:text-red-500"
              >
                Yes
              </button>
              <button
                onClick={cancel}
                className="py-2 px-4 text-xl font-bold hover:text-red-500 hover:border-b-2"
              >
                No
              </button>
            </div>
          )}
          {errMsg && <div className="pt-10">{errMsg}</div>}
        </>
      )}
    </div>
  );
}
