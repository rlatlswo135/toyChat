import React from "react";
import tw from "tailwind-styled-components";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { AuthProvider } from "../provider/AuthProvider";
import { usePageLoading } from "../api/hook";
import { Spinner } from "../components/Spinner";
import Header from "../components/Header";
import { ContentWrap } from "../components/ContentWrap";

function MyApp({ router, Component, pageProps }: AppProps) {
  const { pageLoading } = usePageLoading();
  const pathName = router.pathname;

  const routes = () => {
    switch (pathName) {
      case "/home":
        return (
          <AuthProvider>
            {pageLoading ? <Spinner /> : <Component {...pageProps} />}
          </AuthProvider>
        );
      case "/register":
        return <Component {...pageProps} />;
      default:
        return (
          <AuthProvider>
            <ContentWrap>
              {pageLoading ? (
                <Spinner />
              ) : (
                <>
                  {pathName !== "/chat" && <Header />}
                  <Component {...pageProps} />
                </>
              )}
            </ContentWrap>
          </AuthProvider>
        );
    }
  };
  return <Container>{routes()}</Container>;
}

export default MyApp;

const Container = tw.div`
flex flex-col max-h-screen h-screen w-screen overflow-auto relative px-28 py-12
`;
