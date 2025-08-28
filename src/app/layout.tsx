
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Taloon Studio - Premium Real Estate | Cancún, México",
  description: "Discover luxury real estate in the most beautiful locations. Taloon Studio offers premium properties in Cancún, Tulum, and the Riviera Maya. Experience exceptional service and find your dream home.",
  keywords: "real estate, luxury properties, Cancún, Tulum, Riviera Maya, México, premium homes, beachfront properties, investment properties",
  authors: [{ name: "Taloon Studio" }],
  creator: "Taloon Studio",
  publisher: "Taloon Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://taloonstudio.com'),
  openGraph: {
    title: "Taloon Studio - Premium Real Estate",
    description: "Discover luxury real estate in the most beautiful locations. Premium properties in Cancún, Tulum, and the Riviera Maya.",
    url: 'https://taloonstudio.com',
    siteName: 'Taloon Studio',
    images: [
      {
        url: '/img/celestehome1.jpg',
        width: 1200,
        height: 630,
        alt: 'Taloon Studio Premium Real Estate',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Taloon Studio - Premium Real Estate",
    description: "Discover luxury real estate in the most beautiful locations. Premium properties in Cancún, Tulum, and the Riviera Maya.",
    images: ['/img/celestehome1.jpg'],
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
