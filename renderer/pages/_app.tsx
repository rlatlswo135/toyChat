import React from "react";
import tw from "tailwind-styled-components";
import type { AppProps } from "next/app";

import "../styles/globals.css";
import { Container } from "../components/Container";
import { AuthProvider } from "../provider/AuthProvider";
import Header from "../components/Header";
import { UserList } from "../components/UserList";

function MyApp({ router, Component, pageProps }: AppProps) {
  const pathName = router.pathname;
  return (
    <AuthProvider>
      <Container>
        {["/chatlist", "/chatlist/chat"].includes(pathName) ? (
          <div className="flex flex-col h-full">
            <Header />
            <p className="border-b-2 pt-24 py-12 text-center text-8xl font-bold">
              Welcom to Toy Chat
            </p>
            <div className="flex flex-1 w-full max-h-full mx-auto pt-12 overflow-x-hidden">
              <UserList />
              <Div>
                <ChatWrap>
                  <Component {...pageProps} />
                </ChatWrap>
              </Div>
            </div>
          </div>
        ) : (
          <Component {...pageProps} />
        )}
      </Container>
    </AuthProvider>
  );
}

export default MyApp;

const Div = tw.div`
px-10 py-4 flex-1 max-h-full max-w-full grow-[10]
`;

const ChatWrap = tw.div`
w-full h-full items-center bg-gray-400/25 overflow-y-auto
`;
