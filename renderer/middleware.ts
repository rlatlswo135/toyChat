import { NextResponse } from "next/server";
import { getMyAuth } from "./api/auth";
import type { NextFetchEvent, NextRequest } from "next/server";

export function middleware(req: NextRequest, event: NextFetchEvent) {
  // ! 미들웨어가 더 빨라서 계속 리다이렉트됨
  const fbAuth = getMyAuth();
  const currentUser = fbAuth.currentUser;

  if (currentUser) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/chat", "/chatlist", "/home", "/users"],
};
