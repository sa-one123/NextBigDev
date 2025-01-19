import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../../lib/mongodb";

export const authOptions = {
  debug: true, // Enable debug mode
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      wellKnown: {
        authorization_endpoint: "https://accounts.google.com/o/oauth2/v2/auth",
        token_endpoint: "https://oauth2.googleapis.com/token",
        userinfo_endpoint: "https://openidconnect.googleapis.com/v1/userinfo",
      },
      httpOptions: {
        timeout: 52000,
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }: { user: any }) {
      console.log(authOptions)
      const client = await clientPromise;
      const db = client.db("white_board");

      const existingUser = await db.collection("UserCollection").findOne({ email: user.email });

      if (!existingUser) {
        await db.collection("UserCollection").insertOne({
          ...user,
          role: "Viewer", // Default role for new users
        });
      }

      return true;
    },
    async session({ session, token, user } : any) {
      // Make sure `session.user` exists and attach additional properties
      if (session?.user) {
        session.user.role = user?.role || token?.role || null; // Add a default value to avoid undefined
      }
      return session;
    },
    async redirect({ url, baseUrl } : any) {
      return `${baseUrl}/dashboard`;
    },
    async jwt({ token, user }: { token: any; user: any }) {
      console.log(user)
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
};

// Default export for Next.js API route
export default NextAuth(authOptions);
