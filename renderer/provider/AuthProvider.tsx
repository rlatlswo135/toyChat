import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getMyAuth } from "../api/auth";

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
};

const authContext = createContext<AuthContext | null>(null);

function AuthProvider({ children }: ContextProps) {
  const fbAuth = getMyAuth();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    onAuthStateChanged(fbAuth, (user) => {
      if (user && user.email && user.uid && user.displayName) {
        console.log("````````````Provider - current User Set````````````");
        setCurrentUser({
          email: user.email,
          uid: user.uid,
          name: user.displayName || "기본이름",
          image: user.photoURL,
        });
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
    }),

    [currentUser]
  );

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

const useAuthContext = () => useContext(authContext);

export { AuthProvider, useAuthContext };
