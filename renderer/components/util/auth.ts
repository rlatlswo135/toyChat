import { Account } from "../../api/store";

export const filterCurrent = (
  uid: string | undefined,
  accountList: Account[]
) => {
  if (uid) {
    console.log("````````````accountList````````````", accountList);
    return accountList.filter((user) => user.uid === uid);
  }
  return [];
};
