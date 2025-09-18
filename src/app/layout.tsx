import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${playfairDisplay.variable} ${inter.variable} font-body antialiased`}
        suppressHydrationWarning={true}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
