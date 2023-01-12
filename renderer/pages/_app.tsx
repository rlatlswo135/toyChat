import React from "react";
import { useRouter } from "next/router";
import { auth } from "../api/firebase";
import type { AppProps } from "next/app";

import "../styles/globals.css";
import { Container } from "../components/Container";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const currentUser = auth.currentUser;
  console.log("````````````test````````````", currentUser);

  return (
    <Container>
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
