import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { fbAuth } from "../api/auth";
import { getUserList } from "../api/firebase";

type ContextProps = {
  children: ReactNode;
};

type CurrentUser = {
  email: string;
  uid: string;
};

export type AuthContext = {
  currentUser: CurrentUser | null;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const authContext = createContext<AuthContext | null>(null);

function AuthProvider({ children }: ContextProps) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(fbAuth, (user) => {
      if (user && user.email && user.uid) {
        setCurrentUser({ email: user.email, uid: user.uid });
        router.push("/chatlist");
      } else {
        setCurrentUser(null);
      }
      setIsLoading(false);
    });
  }, []);

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
