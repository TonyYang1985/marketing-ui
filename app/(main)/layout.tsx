import '../globals.css';

import { Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Nav from '@/src/components/layout/nav';

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense>
        <Nav />
      </Suspense>
      {children}
      <Analytics />
    </>
  );
}