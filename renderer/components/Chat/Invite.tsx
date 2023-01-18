import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { RiCloseLine } from "react-icons/ri";
import tw from "tailwind-styled-components";
import profile from "../../public/images/default.png";
import Profile from "../Users/Profile";
import { Empty } from "../Empty";
import {
  Account,
  ChatRoom,
  getAccountList,
  ImageType,
  inviteUserInChatRoom,
  postChatData,
} from "../../api/store";
import { Spinner } from "../Spinner";
import { checkErrorAndSet, makeErrorMsg } from "../util/error";
import { CurrentUser } from "../../provider/AuthProvider";
import { ErrorMsg } from "../../constants/error";
import { getNow } from "../util/time";

type InviteProps = {
  setIsInvite: Dispatch<SetStateAction<boolean>>;
  roomInfo: ChatRoom;
  roomId: string;
  currentUser: CurrentUser | null;
};

export function Invite({
  setIsInvite,
  roomInfo,
  roomId,
  currentUser,
}: InviteProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const [initialAccounts, setInitialAccounts] = useState<Account[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errMsg, setErrMsg] = useState<ErrorMsg>(null);
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
    async (uid: string, email: string, name: string, image: ImageType) => {
      const { users } = roomInfo;
      if (users.findIndex((user) => user.uid === uid) >= 0) {
        console.log("````````````이미 존재하는 유저````````````");
        return;
      }
      // Todo : 각종 유저리스트 등에 "나 자신" 은 제외되게 렌더링. + Users컴포넌트 온라인 / 오프라인 상태에 따라 유저 나누기
      // Todo : 초대시 초대했습니다 메시지 어떻게 데이터 넣을건지
      // Todo : 채팅 맨위에 타임스탬프 어떻게할건지.  -> 카톡은 일자별로 쪼개져서 나옴

      // * 당장 생각난건 chatList에 sendInfo에 system 이라는 플래그로 넣어서 별도로 렌더링해줄지 고민

      const result = await inviteUserInChatRoom(roomId, {
        uid,
        email,
        name,
        image,
      });
      const e1 = checkErrorAndSet(result, setErrMsg, setIsInvite);
      if (e1) return;

      const sysChat = {
        content: `${currentUser?.name || "?"}님이 ${name}님을 초대했습니다.`,
        sendInfo: {
          email: "",
          name: "",
          uid: "",
          image: null,
        },
        createdAt: getNow(),
        isSystem: true,
      };
      const sysChatResult = await postChatData(roomId, sysChat);
      const e2 = checkErrorAndSet(sysChatResult, setErrMsg, setIsInvite);
      if (e2) return;

      console.log("````````````초대완료````````````");
      setIsInvite(false);
    },
    [roomId, roomInfo, currentUser]
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const node = e.target instanceof Element && e.target;
      const ref = modalRef.current;
      console.log(ref?.contains(node as Element));
      if (node && !ref?.contains(node)) {
        setIsInvite(false);
      }
    };
    setTimeout(() => {
      document.addEventListener("click", handler);
    }, 1000);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  useEffect(() => {
    async function fetchAndSet() {
      const result = (await getAccountList()) as Account[];
      const e = checkErrorAndSet(result, setErrMsg, setIsInvite);
      if (e) return;

      setInitialAccounts(result);
      setAccounts(result);
      setLoading(false);
    }
    if (!currentUser) {
    }
    fetchAndSet();
  }, []);

  if (errMsg) {
    return <div>Error</div>;
  }

  return (
    <Container
      ref={(ele) => {
        if (ele) {
          modalRef.current = ele;
        }
      }}
    >
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
              {accounts
                .filter((user) => user.uid !== currentUser?.uid)
                .map(({ uid, email, name, image, isLogin }) => (
                  <Profile
                    key={`Invite-${uid}`}
                    onClick={() => inviteUser(uid, email, name, image)}
                    name={name}
                    email={email}
                    padding={2}
                    isLogin={isLogin}
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
