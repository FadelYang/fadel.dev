import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Suspense } from 'react';
import Header from './(homepage)/header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Fadela Numah Kadenza',
  description:
    'A full stack web developer who can build website from scratch and integrate it with machine learning model',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense>
          <Header />
        </Suspense>
        {children}
      </body>
      <GoogleAnalytics gaId='G-1VCH9H6NML' />
    </html>
  );
}
