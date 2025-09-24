
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Houze Master - Land Investment & Tokenization | México",
  description: "Explore land investment opportunities starting from 450K MXN. Flexible payment options including traditional payments, Bitcoin, and USDT. Discover property tokenization possibilities with Houze Master.",
  keywords: "land investment, property tokenization, Bitcoin payments, USDT payments, real estate México, land development, cryptocurrency real estate, investment opportunities",
  authors: [{ name: "Houze Master" }],
  creator: "Houze Master",
  publisher: "Houze Master",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://houzemaster.com'),
  openGraph: {
    title: "Houze Master - Land Investment & Tokenization",
    description: "Explore land investment opportunities starting from 450K MXN. Flexible payment options including Bitcoin and USDT. Discover property tokenization possibilities.",
    url: 'https://houzemaster.com',
    siteName: 'Houze Master',
    images: [
      {
        url: '/img/houses/banner1.jpg',
        width: 1200,
        height: 630,
        alt: 'Houze Master Land Investment',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Houze Master - Land Investment & Tokenization",
    description: "Explore land investment opportunities starting from 450K MXN. Flexible payment options including Bitcoin and USDT.",
    images: ['/img/houses/banner1.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
