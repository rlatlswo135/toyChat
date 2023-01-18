import React from "react";
import { GetServerSideProps } from "next";
import { My } from "../components/My";
import { Account, getAccountList } from "../api/store";

// export type MyPage = {
//   docId: string | null;
//   accountList: Account[];
// };
// { docId, accountList }: MyPage
export default function my() {
  // return <My docId={docId} accountList={accountList} />;
  return <My />;
}

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   const uid = query.id;
//   const accountList = await getAccountList();

//   if (typeof accountList === "string") {
//     return {
//       props: {
//         docId: null,
//       },
//     };
//   }

//   const docId = accountList.filter((user) => user.uid === uid)[0].docId;
//   return {
//     props: {
//       docId,
//       accountList,
//     },
//   };
// };
