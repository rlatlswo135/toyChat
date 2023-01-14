import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { fbAuth } from "../api/auth";
import { Account, getAccountList } from "../api/store";

type ContextProps = {
  children: ReactNode;
};

type CurrentUser = {
  email: string;
  uid: string;
  name: string;
  image: string | null;
};

export type AuthContext = {
  currentUser: CurrentUser | null;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const authContext = createContext<AuthContext | null>(null);

function AuthProvider({ children }: ContextProps) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [accountList, setAccountList] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchAndSet() {
      const result = await getAccountList();
      if (result && typeof result !== "string" && result.length) {
        setAccountList(result);
      }
    }

    if (!accountList.length) {
      fetchAndSet();
    }

    if (accountList) {
      onAuthStateChanged(fbAuth, (user) => {
        if (user && user.email && user.uid) {
          setCurrentUser({
            email: user.email,
            uid: user.uid,
            name: user.displayName || "",
            image: user.photoURL,
          });
        } else {
          setCurrentUser(null);
        }
      });
    }
  }, [accountList]);

  const value = useMemo(
    () => ({
      currentUser,
      isLoading,
      setIsLoading,
    }),
    [currentUser, isLoading, setIsLoading]
  );

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

const useAuthContext = () => useContext(authContext);

export { AuthProvider, useAuthContext };
