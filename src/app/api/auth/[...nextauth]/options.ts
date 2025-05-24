import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          // Accept email or username in 'identifier' property for login
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });
          if (!user) {
            throw new Error("No user with this Email or Username");
          }
          if (!user.isverified) {
            throw new Error("Please verify your email before logging in");
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordCorrect) {
            throw new Error("Incorrect password");
          }
          return user;
        } catch (err: any) {
          throw new Error(err.message || "Login failed");
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // On first login with OAuth
      if (
        user &&
        account &&
        (account.provider === "github" || account.provider === "google")
      ) {
        await dbConnect();

        // Find user by email
        let dbUser = await UserModel.findOne({ email: user.email });

        // If not exist, create user (auto-verified)
        if (!dbUser) {
          const expiryDate = new Date();
          const since = expiryDate;
          expiryDate.setHours(expiryDate.getHours() + 1);
          const username = user.email?.split("@")[0]; // Or generate unique username as needed
          dbUser = await UserModel.create({
            email: user.email,
            username,
            password: "dummy",
            isverified: true,
            phonenumber: Math.floor(100000 + Math.random() * 900000).toString(),
            image: user.image || "",
            isAcceptingMessages: true,
            createdAt: since,
            verifyCode: Math.floor(100000 + Math.random() * 900000).toString(),
            verifyCodeExpiry: expiryDate,
            messages: [],
          });
        }

        // Sync dbUser info to token
        token._id = dbUser._id?.toString();
        token.username = dbUser.username;
        token.isverified = dbUser.isverified;
        token.image = dbUser.image;
        token.isAcceptingMessages = dbUser.isAcceptingMessages;
      }

      // Credentials login flow - sync user fields
      if (user && account?.provider === "credentials") {
        token._id = user._id?.toString();
        token.username = user.username;
        token.isverified = user.isverified;
        token.image = user.image;
        token.isAcceptingMessages = user.isAcceptingMessages;
      }

      return token;
    },

    async session({ session, token }) {
      if (token?._id) {
        session.user = {
          ...session.user,
          _id: token._id,
          username: token.username,
          isverified: token.isverified,
          image: token.image,
          isAcceptingMessages: token.isAcceptingMessages,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/auth/new-user",
  },
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    csrfToken: {
      name: `next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
};
