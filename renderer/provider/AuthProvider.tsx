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
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { fbAuth } from "../api/auth";

type ContextProps = {
  children: ReactNode;
};

export type CurrentUser = {
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
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    if (currentUser) {
      router.push("/users");
      setIsLoading(false);
      return;
    }
    onAuthStateChanged(fbAuth, (user) => {
      if (user && user.email && user.uid) {
        setCurrentUser({
          email: user.email,
          uid: user.uid,
          name: user.displayName || "",
          image: user.photoURL,
        });
      }
      setIsLoading(false);
    });
  }, [currentUser]);

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
