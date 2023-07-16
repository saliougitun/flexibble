import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { SessionInterface } from "@/common.types";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  theme: {
    colorScheme: "light",
    logo: "/logo.svg",
  },
  callbacks: {
    async session({ session }) {
      return session;
    },
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
export async function getCurrentUser() {
  const session = await getServerSession(authOptions) as SessionInterface;
  return session;
}
