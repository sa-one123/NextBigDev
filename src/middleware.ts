import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // Allow access to public routes (e.g., login page, API routes, static files)
  if (
    pathname.startsWith("/login") || // Public login page
    pathname.startsWith("/api/auth") || // NextAuth API routes
    pathname.startsWith("/_next") || // Static files
    pathname.startsWith("/favicon.ico") // Favicon
  ) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to login
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Redirect logged-in users from login to the dashboard
  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Allow authenticated users to access protected routes
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*","/board/:path*", "/board/:path*", "/settings/:path*", "/login"], // Add your protected routes here
};
