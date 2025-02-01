import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster"

import localFont from 'next/font/local'
import AuthProvidder from "@/context/AuthProvider";
const myFont = localFont({
  src: './fonts/NeueHaasDisplayBold.woff2'
})

export const metadata: Metadata = {
  title: "Vring",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={myFont.className}>
      <AuthProvidder>
        <body className="vsc-initialized">
          <Navbar />
          {children}
          <Toaster />
        </body>
      </AuthProvidder>
    </html>
  );
}
