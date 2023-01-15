import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import { useRouter } from "next/router";
import { RiCloseLine } from "react-icons/ri";
import tw from "tailwind-styled-components";
import profile from "../../public/images/default.png";
import Profile from "../Users/Profile";
import { Empty } from "../Empty";
import {
  Account,
  ChatRoom,
  getAccountList,
  inviteUserInChatRoom,
} from "../../api/store";
import { Spinner } from "../Spinner";
import { makeErrorMsg } from "../util/error";

type InviteProps = {
  setIsInvite: Dispatch<SetStateAction<boolean>>;
  roomInfo: ChatRoom;
  roomId: string;
};

export function Invite({ setIsInvite, roomInfo, roomId }: InviteProps) {
  const [initialAccounts, setInitialAccounts] = useState<Account[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [flag, setFlag] = useState<string>("");

  const [isPending, startTransition] = useTransition();

  const searchAccount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const flag = e.target.value;
      setFlag(flag);
      if (!flag) {
        setAccounts(initialAccounts);
        return;
      }

      startTransition(() => {
        setAccounts(initialAccounts.filter((user) => user.name.includes(flag)));
      });
    },
    [initialAccounts]
  );

  const inviteUser = useCallback(
    async (uid: string, email: string, name: string, image: string | null) => {
      const { users } = roomInfo;
      if (users.findIndex((user) => user.uid === uid) >= 0) {
        console.log("````````````이미 존재하는 유저````````````");
        return;
      }

      const result = await inviteUserInChatRoom(roomId, {
        uid,
        email,
        name,
        image,
      });

      if (typeof result === "string") {
        makeErrorMsg(result, setErrMsg);
        setIsInvite(false);
        return;
      }
      console.log("````````````초대완료````````````");
      setIsInvite(false);
    },
    [roomId, roomInfo]
  );

  useEffect(() => {
    async function fetchAndSet() {
      const result = await getAccountList();
      if (typeof result === "string") {
        makeErrorMsg(result, setErrMsg);
        setLoading(false);
        return;
      }
      setInitialAccounts(result);
      setAccounts(result);
      setLoading(false);
    }
    fetchAndSet();
  }, []);

  if (errMsg) {
    return <div>Error</div>;
  }

  return (
    <Container>
      <SubContainer>
        <form className="relative w-full mb-4">
          <SearchInput
            type="text"
            value={flag}
            onChange={(e) => searchAccount(e)}
            placeholder="유저 검색"
          />
        </form>
        {loading || errMsg ? (
          <Spinner
            size={50}
            fontSize="text-2xl"
            height="h-[50%]"
            text={errMsg}
          />
        ) : (
          <>
            <div className="mb-10">
              {accounts.map(({ uid, email, name, image }) => (
                <Profile
                  key={`Invite-${uid}`}
                  onClick={() => inviteUser(uid, email, name, image)}
                  name={name}
                  email={email}
                  size={20}
                  padding={2}
                  src={image || profile}
                />
              ))}
            </div>
            <Empty />
          </>
        )}
      </SubContainer>
      <button
        title="invite_close"
        className="p-3 absolute top-0 right-0"
        onClick={() => setIsInvite(false)}
      >
        <RiCloseLine />
      </button>
    </Container>
  );
}

const Container = tw.div`
absolute w-[90%] h-[75%] flex flex-col justify-center items-center bg-gray-500/70
top-[55%] left-[50%] translate-x-[-50%] translate-y-[-50%]
`;
const SubContainer = tw.div`
h-[70%] w-[60%] overflow-y-auto overflow-x-hidden relative
`;

const SearchInput = tw.input`
rounded-xl w-full px-[5%] py-2 outline-none
`;
const SearchBtn = tw.button`
absolute left-[94%] top-[50%] translate-y-[-50%] z-50 text-black
`;
