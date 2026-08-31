import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Suspense } from 'react';
import Header from './(homepage)/header';
import ScrollToTop from '@/components/scroll-to-top';
import Footer from '@/components/footer';
import { getDictionary, Locale } from '@/lib/dictionary';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return {
    title: 'Fadela Numah Kadenza',
    description: dict.footer.description,
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const activeLocale = (locale as Locale) || 'en';

  return (
    <html lang={activeLocale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ScrollToTop />
        <Suspense>
          <Header locale={activeLocale} />
        </Suspense>
        <div className="flex-grow flex flex-col">
          {children}
        </div>
        <Footer locale={activeLocale} />
      </body>
      <GoogleAnalytics gaId='G-1VCH9H6NML' />
    </html>
  );
}

