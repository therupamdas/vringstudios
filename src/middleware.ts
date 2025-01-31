// Import necessary modules and functions from Next.js and NextAuth
import { NextRequest, NextResponse } from 'next/server';
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { authOptions } from './app/api/auth/[...nextauth]/options';

// import session from './lib/sendertok';
// console.log("mkc");
// console.log(session);


/**
 * Middleware function to handle authentication and route protection.
 * This function is marked `async` to allow the use of `await` for asynchronous operations.
 */
export async function middleware(request: NextRequest) {
  // Retrieve the authentication token from the request using NextAuth's `getToken` method
  const token = await getToken({ req: request });
  // const sessiontoken = await getServerSession({ });
  // console.log(token)
  // console.log(sessiontoken)
  // Extract the URL object from the incoming request
  const url = request.nextUrl;

  // Define a list of public routes that do not require authentication
  const publicRoutes = ['/'];

  /**
   * Redirect the user to the home page if:
   * - No authentication token is present
   * - The requested route is not listed as a public route
   */
  if (!token && !publicRoutes.includes(url.pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }


  // Allow the request to proceed if no redirect conditions are met
  return NextResponse.next();
}

/**
 * Configuration object for defining which routes the middleware should match.
 */
export const config = {
  matcher: [
    '/',          // Match the home route
   '/profile'    // Match the profile route
  ],
};
