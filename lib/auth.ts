import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthOptions,Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import  CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";

declare module "next-auth" {  
  interface Session {
    user: {      
      id:string
      name:string
      email:string
    }
  }
}

export const authOptions: NextAuthOptions = {
  secret:process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Nhập email" },
        password: { label: "Password", type: "password", placeholder:"Nhập password" },
      },
      async authorize(credentials, req) {
        if (credentials) {
          const res = await prisma.user.findUnique(
            {
                where:{
                    email:credentials.email,
                    password:credentials.password
                }
            }
        )
        
        if (res) {
          return {
              id: res.id.toString(), 
              name: res.name,
              email: res.email,
          }}else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      const sessionInfo = {
        user: {
          id: token.id,
          email: token.email,
          name: token.name,
        },
        expires: session.expires,
        accessToken: token.token,
      };

      return sessionInfo;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        return {...token, ...user};
      }
      return token;
    },
  },
};

