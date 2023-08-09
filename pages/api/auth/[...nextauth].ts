import NextAuth, { Awaitable, NextAuthOptions, RequestInternal, User } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from "next-auth/providers/credentials";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const authOptions: NextAuthOptions = {
  secret: process.env.JWT_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 1* 24 * 60 * 60, // 1 days
  },
  pages: {
    signIn: '/signin',
  },
  theme: {
    colorScheme: 'auto', // "auto" | "dark" | "light"
    brandColor: '', // Hex color code #33FF5D
    logo: '/vercel.svg', // Absolute URL to image
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === 'development',
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'marketing-ui',
      type: "credentials",
      credentials: {
        name: { label: "User Name", type: "name" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const payload = {
          name: credentials?.name,
          password: credentials?.password,
        }
        const response = await fetch(backendURL + "/signIn/pwd", { 
          method: 'POST',
          body: JSON.stringify(payload),  
          headers: {
            'Content-Type': 'application/json'
          } 
        }
        );

        const user = await response.json();
        // If no error and we have user data, return it
        if (response.ok && user) {
          return user;
        }
        // If no error and we have user data, return it
        if (!response.ok) {
          throw new Error(user?.errors);
        }
        // Return null if user data could not be retrieved
        return null;
      },
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.email = user.email;
        token.userName = user.userName;
        token.userType = user.userType;
        token.accessToken = user.token;
        token.refreshToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.email = token.email;
        session.user.userName = token.userName;
        session.user.userType = token.userType;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
