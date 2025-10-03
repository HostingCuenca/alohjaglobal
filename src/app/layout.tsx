import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import SocialMediaSidebar from "@/components/SocialMediaSidebar";

const playfairDisplay = Playfair_Display({
  variable: "--font-headline",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Alohja Coffee - Premium Coffee from Ecuador",
  description: "Café premium de Ecuador cultivado bajo sombra en armonía con la naturaleza. Premium coffee from Ecuador cultivated under shade in harmony with nature.",
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml' },
  ],
  manifest: '/site.webmanifest',
  metadataBase: new URL('https://alohjaglobal.com'),
  openGraph: {
    title: "Alohja Coffee - Premium Coffee from Ecuador",
    description: "Café premium de Ecuador cultivado bajo sombra en armonía con la naturaleza.",
    url: 'https://alohjaglobal.com',
    siteName: 'Alohja Coffee',
    images: [
      {
        url: '/assets/LogoHorizontal.png',
        width: 1200,
        height: 630,
        alt: 'Alohja Coffee Logo',
      }
    ],
    locale: 'es_EC',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Alohja Coffee - Premium Coffee from Ecuador",
    description: "Café premium de Ecuador cultivado bajo sombra en armonía con la naturaleza.",
    images: ['/assets/LogoHorizontal.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${playfairDisplay.variable} ${inter.variable} font-body antialiased`}
        suppressHydrationWarning={true}
      >
        <CartProvider>
          <SocialMediaSidebar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
