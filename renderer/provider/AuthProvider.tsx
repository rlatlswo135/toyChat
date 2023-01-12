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
import { onAuthStateChanged } from "firebase/auth";
import { fbAuth } from "../api/auth";
import { User } from "firebase/auth";

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
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log("`````````test`````````", fbAuth.currentUser);

  useEffect(() => {
    onAuthStateChanged(fbAuth, (user) => {
      if (user && user.email && user.uid) {
        setCurrentUser({ email: user.email, uid: user.uid });
      }
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
