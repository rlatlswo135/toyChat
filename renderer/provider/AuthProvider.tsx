import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { onAuthStateChanged, onIdTokenChanged } from "firebase/auth";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const fbAuth = getMyAuth();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const authChange = onAuthStateChanged(fbAuth, (user) => {
      console.log(user?.email, user?.uid, user?.displayName, user?.photoURL);
      if (user && user.email && user.uid && user.displayName) {
        const { email, uid, displayName: name, photoURL: image } = user;
        setCurrentUser({ email, uid, name, image });
        router.push("/users", undefined, { shallow: true });
      } else {
        console.log("Provider -> Logout");
        setCurrentUser(null);
        router.push("/home", undefined, { shallow: true });
      }
    });
    return () => {
      authChange();
    };
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
