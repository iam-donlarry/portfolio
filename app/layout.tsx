import React from 'react';
import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Quadri Adekunle | Full-Stack Systems Engineer & UI/UX Architect',
  description: 'Explore the 3D portfolio of Quadri Adekunle — Experienced Full-Stack Developer & UI/UX Systems Architect based in Nigeria. Building high-performance web systems and AI applications.',
  keywords: [
    'Quadri Adekunle',
    'Full Stack Developer',
    'Next.js Developer',
    'React Developer',
    'TypeScript Developer',
    'Tailwind CSS',
    'Aceternity UI',
    'UI/UX Designer',
    'Web Architecture',
    'Portfolio'
  ],
  authors: [{ name: 'Quadri Adekunle', url: 'https://quadriadekunle.vercel.app' }],
  creator: 'Quadri Adekunle',
  metadataBase: new URL('https://quadriadekunle.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://quadriadekunle.vercel.app',
    title: 'Quadri Adekunle | Full-Stack Systems Engineer & UI/UX Architect',
    description: 'Explore the 3D portfolio, AI tools, and production engineering works of Quadri Adekunle.',
    siteName: 'Quadri Adekunle Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Quadri Adekunle Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quadri Adekunle | Full-Stack Systems Engineer',
    description: 'Crafting extraordinary digital realities and scalable web architectures.',
    creator: '@Coredrii',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/Avatar.png', type: 'image/png' },
    ],
    shortcut: '/Avatar.png',
    apple: '/Avatar.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#05050A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/Avatar.png" type="image/png" />
        <link rel="shortcut icon" href="/Avatar.png" type="image/png" />
        <link rel="apple-touch-icon" href="/Avatar.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Outfit:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#05050A] text-white font-sans overflow-x-hidden min-h-screen selection:bg-[#915DFF] selection:text-black">
        {children}
      </body>
    </html>
  );
}
