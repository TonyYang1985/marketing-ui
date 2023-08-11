import NextAuth, { Awaitable, NextAuthOptions, RequestInternal, User } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
   secret: process.env.NEXTAUTH_SECRET,
  //secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
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
  debug: process.env.NODE_ENV === 'development' ? true : false,
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'marketing-ui',
      type: "credentials",
      credentials: {
        name: { label: "User Name", type: "name" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const payload = {
          name: credentials?.name,
          password: credentials?.password,
        }
        const response = await fetch("http://127.0.0.1:8080/signIn/pwd", { 
          method: 'POST',
          body: JSON.stringify(payload),  
          headers: {
            'Content-Type': 'application/json'
          } 
        }
        );
        console.log(credentials);
        const user = await response.json();
        console.log(user);
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
        token.name = user.name;
        token.userName = user?.name;
        token.userType = user?.userType;
        token.accessToken = user?.token;
        token.refreshToken = user?.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.name = token.name;
        session.user.userName = token.name;
        session.user.userType = token.userType;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
