import '~/globals.css';

import { Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Nav from '@/src/components/layout/nav';
import Toast from '@/src/components/toast';

export const metadata = {
  title: 'Next.js 13 + PlanetScale + NextAuth + Tailwind CSS',
  description:'A user admin dashboard configured with Next.js, PlanetScale, NextAuth, Tailwind CSS, TypeScript, ESLint, and Prettier.'
};

export default async function RootLayout({ children}: {children: React.ReactNode}) {
  return (<> {children}</>);
}
