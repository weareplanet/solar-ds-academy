import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  'https://weareplanet.github.io/solar-ds-academy';

export const metadata: Metadata = {
  title: 'Solar DS Academy',
  description:
    'Learn to build prototypes with @Solar — no coding required. For PMs, POs, and Product Designers at Planet.',
  openGraph: {
    title: 'Solar DS Academy',
    description:
      'Learn to build prototypes with @Solar — no coding required. For PMs, POs, and Product Designers at Planet.',
    url: baseUrl,
    siteName: 'Solar DS Academy',
    images: [
      {
        url: `${baseUrl}/images/og-preview.png`,
        width: 1280,
        height: 900,
        alt: 'Solar DS Academy — Build prototypes with @Solar',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solar DS Academy',
    description:
      'Learn to build prototypes with @Solar — no coding required. For PMs, POs, and Product Designers at Planet.',
    images: [`${baseUrl}/images/og-preview.png`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/favicon.png`} />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
