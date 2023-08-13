import '../globals.css';

import { Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Nav from '@/src/components/layout/nav';
import NextAuthProvider from '~/providers';

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
     <NextAuthProvider>
      <Suspense>
        <Nav />
      </Suspense>
      {children}
      <Analytics />
    </NextAuthProvider>

    </>
  );
}