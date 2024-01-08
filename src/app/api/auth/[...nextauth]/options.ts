import prisma from "@/lib/prisma/client";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }
        const { email, password } = credentials;
        const user = await prisma.user.findFirst({
          where: {
            email: email,
          },
        });

        if (!user) {
          return null;
        }

        const userPassword = user.password;
        const isValidPassword = bcrypt.compareSync(password, userPassword);
        if (!isValidPassword) {
          return null;
        }
        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secret123token",
  jwt: {
    async encode({ secret, token }) {
      if (!token) {
        throw new Error("No token to encode");
      }

      return jwt.sign(token, secret);
    },
    async decode({ secret, token }) {
      if (!token) {
        throw new Error("No token to decode");
      }
      const decodedToken = jwt.verify(token, secret);
      if (typeof decodedToken === "string") {
        return JSON.parse(decodedToken);
      } else {
        return decodedToken;
      }
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    session: ({ session, token, user }) => {
      if (session.user) {
        session.user.email = token.email;
      }
      return {
        ...session,
        id: token.id,
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        token.email = user.email;
        return {
          ...token,
          id: u.id,
        };
      }
      return token;
    },
  },
};
