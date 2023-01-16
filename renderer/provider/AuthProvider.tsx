import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { fbAuth } from "../api/auth";
import { User } from "@firebase/auth-types";

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
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    onAuthStateChanged(fbAuth, (user) => {
      console.log("user", user);
      console.log("displayname", user?.displayName);
      if (user && user.email && user.uid && user.displayName) {
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
