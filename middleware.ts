import { NextResponse } from "next/server";
import { auth } from "./auth";

const protectedPaths = [
  "/account",
  "/cart",
  "/checkout",
  "/payments",
  "/wishlist",
];
const adminPaths = ["/admin"];
const publicRoutes = ["/login", "/signup", "/reset-password"];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isSession = !!req.auth;
  const role = req.auth?.user.role || "guest";

  const isProtectedPaths = protectedPaths.some((p) => pathname.startsWith(p));
  const isAdminPaths = adminPaths.some((p) => pathname.startsWith(p));
  const isPublicRoutes = publicRoutes.some(
    (p) => pathname.startsWith(p) || p === "/"
  );

  if (!isSession && isProtectedPaths) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (role !== "ADMIN" && isAdminPaths) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isSession && isPublicRoutes) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
