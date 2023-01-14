import React from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Container } from "../components/Container";
import { AuthProvider } from "../provider/AuthProvider";

function MyApp({ router, Component, pageProps }: AppProps) {
  const pathName = router.pathname;
  return (
    <Container>
      {["/chatlist", "/chat", "/home"].includes(pathName) ? (
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      ) : (
        <Component {...pageProps} />
      )}
    </Container>
  );
}

export default MyApp;
