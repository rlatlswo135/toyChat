import { NextResponse } from "next/server";
import { fbAuth } from "./api/auth";
import type { NextFetchEvent, NextRequest } from "next/server";

export function middleware(req: NextRequest, event: NextFetchEvent) {
  // ! 미들웨어가 더 빨라서 계속 리다이렉트됨
  const currentUser = fbAuth.currentUser;

  if (!currentUser) {
    console.log(`redirect to ${req.nextUrl.origin}/home`);
    // return NextResponse.redirect(`${req.nextUrl.origin}/home`);
  }
}

export const config = {
  matcher: ["/chat"],
};
