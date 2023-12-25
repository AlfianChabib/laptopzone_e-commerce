import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LaptopZone - Your One-Stop Laptop Shop",
  description:
    "Explore a wide range of laptops at LaptopZone. Find the perfect laptop for your needs with the latest technology and features.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <Providers>
          <main className="max-w-7xl mx-auto">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
