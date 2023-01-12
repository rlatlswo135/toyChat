import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { auth } from "./api/firebase";

export function middleware(req: NextRequest, event: NextFetchEvent) {
  // const currentUser = auth.currentUser;
  // if (!currentUser) {
  // console.log("````````````req.url````````````", req.nextUrl.host);
  // return NextResponse.redirect(`${req.nextUrl.host}/home`);
  // }
  console.log("전역 미들웨어");
}
