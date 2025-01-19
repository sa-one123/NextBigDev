import NextAuth, { AuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../../lib/mongodb";
import { JWT } from "next-auth/jwt";

interface ExtendedUser extends User {
  role?: string; // Extend the default User type to include role
}
export const authOptions: AuthOptions = {
  debug: true, // Enable debug mode
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
    async signIn({ user }: { user: ExtendedUser }) {
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
    session({ session}) {
      return session // The return type will match the one returned in `useSession()`
    },
    async redirect({ baseUrl }: { baseUrl: string }) {
      return `${baseUrl}/dashboard`;
    },
    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user?: ExtendedUser;
    }) {
      console.log(user);
      if (user) {
        token.role = user.role;
      }
      return token;
    }
  },
};

// Default export for Next.js API route
export default NextAuth(authOptions);
