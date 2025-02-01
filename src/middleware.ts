// Import necessary modules and functions from Next.js and NextAuth
import { NextRequest, NextResponse } from 'next/server';
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { authOptions } from './app/api/auth/[...nextauth]/options';


export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;
  const publicRoutes = ['/'];
  if (!token && !publicRoutes.includes(url.pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    '/',          // Match the home route
   '/profile'    // Match the profile route
  ],
};
