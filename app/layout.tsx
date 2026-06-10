import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryProvider } from "@/components/QueryProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Jurusan Informatika UHN IGB Sugriwa Denpasar",
  description:
    "Homepage resmi Jurusan Informatika UHN IGB Sugriwa Denpasar dengan profil akademik, fokus keilmuan, berita, dan agenda."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} font-sans antialiased`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
