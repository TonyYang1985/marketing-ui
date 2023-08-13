import './globals.css';

import { Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Nav from '@/src/components/layout/nav';

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Suspense>
          <Nav />
        </Suspense>
        {children}
        <Analytics />
      </body>
    </html>
  );
}