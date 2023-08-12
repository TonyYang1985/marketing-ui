"use client";

import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider =  ({ children }: Props) => {
  console.log(`*********3  NextAuthProvider *******`);
return <SessionProvider >{children}</SessionProvider>;
};