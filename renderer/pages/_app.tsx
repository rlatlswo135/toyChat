import React from "react";
import { useRouter } from "next/router";
import { fbAuth } from "../api/auth";
import type { AppProps } from "next/app";

import "../styles/globals.css";
import { Container } from "../components/Container";
import { AuthProvider } from "../provider/AuthProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Container>
        <Component {...pageProps} />
      </Container>
    </AuthProvider>
  );
}

export default MyApp;
