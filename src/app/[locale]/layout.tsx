
import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import "./globals.css";

const locales = ['es', 'en'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const isSpanish = locale === 'es';
  
  return {
    title: isSpanish 
      ? "Houze Master - Inversión en Terrenos y Tokenización | México"
      : "Houze Master - Land Investment & Tokenization | México",
    description: isSpanish
      ? "Explora oportunidades de inversión en terrenos desde 450K MXN. Opciones de pago flexibles incluyendo pagos tradicionales, Bitcoin y USDT. Descubre posibilidades de tokenización de propiedades con Houze Master."
      : "Explore land investment opportunities starting from 450K MXN. Flexible payment options including traditional payments, Bitcoin, and USDT. Discover property tokenization possibilities with Houze Master.",
    keywords: isSpanish
      ? "inversión en terrenos, tokenización de propiedades, pagos Bitcoin, pagos USDT, bienes raíces México, desarrollo de terrenos, criptomonedas bienes raíces, oportunidades de inversión"
      : "land investment, property tokenization, Bitcoin payments, USDT payments, real estate México, land development, cryptocurrency real estate, investment opportunities",
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
      title: isSpanish
        ? "Houze Master - Inversión en Terrenos y Tokenización"
        : "Houze Master - Land Investment & Tokenization",
      description: isSpanish
        ? "Explora oportunidades de inversión en terrenos desde 450K MXN. Opciones de pago flexibles incluyendo Bitcoin y USDT. Descubre posibilidades de tokenización de propiedades."
        : "Explore land investment opportunities starting from 450K MXN. Flexible payment options including Bitcoin and USDT. Discover property tokenization possibilities.",
      url: 'https://houzemaster.com',
      siteName: 'Houze Master',
      images: [
        {
          url: '/img/houses/banner1.jpg',
          width: 1200,
          height: 630,
          alt: isSpanish ? 'Inversión en Terrenos Houze Master' : 'Houze Master Land Investment',
        },
      ],
      locale: isSpanish ? 'es_MX' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: isSpanish
        ? "Houze Master - Inversión en Terrenos y Tokenización"
        : "Houze Master - Land Investment & Tokenization",
      description: isSpanish
        ? "Explora oportunidades de inversión en terrenos desde 450K MXN. Opciones de pago flexibles incluyendo Bitcoin y USDT."
        : "Explore land investment opportunities starting from 450K MXN. Flexible payment options including Bitcoin and USDT.",
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
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as typeof locales[number])) notFound();

  // Get messages for the specific locale
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className="scroll-smooth">
      <body className="antialiased">
        <NextIntlClientProvider 
          messages={messages}
          locale={locale}
          now={new Date()}
          timeZone="America/Mexico_City"
        >
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
