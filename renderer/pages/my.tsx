import React from "react";
import { GetServerSideProps } from "next";
import { My } from "../components/My";
import { getAccountList } from "../api/store";

export type MyPage = {
  docId: string | null;
};
export default function my({ docId }: MyPage) {
  return <My docId={docId} />;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const uid = query.id;
  const accountList = await getAccountList();

  if (typeof accountList === "string") {
    return {
      props: {
        docId: null,
      },
    };
  }

  const docId = accountList.filter((user) => user.uid === uid)[0].docId;
  return {
    props: {
      docId,
    },
  };
};