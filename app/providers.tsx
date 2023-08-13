"use client";
import React, { ReactNode } from 'react';
import { SessionProvider } from "next-auth/react";


interface Props {
  children: ReactNode
}

function NextAuthProvider({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>
}

export default NextAuthProvider;