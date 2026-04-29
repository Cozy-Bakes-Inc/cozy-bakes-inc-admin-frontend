import { NextRequest, NextResponse } from "next/server";

const TOKEN_KEY = "token";
const DASHBOARD_PATH = "/";
const LOGIN_PATH = "/login";

const publicRoutes = [
  LOGIN_PATH,
  "/forget-password",
  "/verify-otp",
  "/new-password",
];

const isPublicRoute = (pathname: string) =>
  publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

const redirectTo = (
  request: NextRequest,
  pathname: string,
  shouldDeleteToken = false,
) => {
  const response = NextResponse.redirect(new URL(pathname, request.url));

  if (shouldDeleteToken) {
    response.cookies.delete(TOKEN_KEY);
  }

  return response;
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(TOKEN_KEY)?.value;
  const isPublic = isPublicRoute(pathname);

  if (!token) {
    return isPublic ? NextResponse.next() : redirectTo(request, LOGIN_PATH);
  }

  if (isPublic) {
    return redirectTo(request, DASHBOARD_PATH);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
