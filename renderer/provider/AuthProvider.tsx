import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { changeLoginState, ImageType } from "../api/store";
import { fbAuth } from "../api/firebase";

type ContextProps = {
  children: ReactNode;
};

export type CurrentUser = {
  email: string;
  uid: string;
  name: string;
  image: ImageType;
};

export type AuthContext = {
  currentUser: CurrentUser | null;
};

const authContext = createContext<AuthContext | null>(null);

function AuthProvider({ children }: ContextProps) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  //! Register에서 언마운트됬을때 다시 이벤트를 Set하는게 핵심 updateProfile보다 이벤트옵저버가 더 빨라서 업데이트된게 안들어온다..
  useEffect(() => {
    const authChange = onAuthStateChanged(fbAuth, (user) => {
      console.log("Provider -> user", user);
      if (user && user.email && user.uid && user.displayName) {
        const { email, uid, photoURL: image, displayName: name } = user;
        setCurrentUser({ email, uid, name: name || "기본", image });
        router.push("/users", undefined, { shallow: true });
      } else {
        console.log("Provider -> Logout");
        setCurrentUser(null);
        if (currentUser) {
          changeLoginState(currentUser.email, false).then((item) =>
            console.log("Provider -> unmout logout", item)
          );
        }
        router.push("/home", undefined, { shallow: true });
      }
    });
    return () => {
      console.log("Provider -> unmount");
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
