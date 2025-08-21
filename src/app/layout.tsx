
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HouzeMaster - Propiedades Excepcionales en México",
  description: "Descubre propiedades excepcionales en México con HouzeMaster. Encuentra tu hogar ideal con nuestro inventario curado y servicio personalizado.",
  keywords: "propiedades, bienes raíces, México, casas, departamentos, venta, renta, HouzeMaster",
  authors: [{ name: "HouzeMaster" }],
  openGraph: {
    title: "HouzeMaster - Propiedades Excepcionales en México",
    description: "Descubre propiedades excepcionales en México con HouzeMaster",
    type: "website",
    locale: "es_MX",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
