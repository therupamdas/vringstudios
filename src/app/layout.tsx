import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import '@fortawesome/fontawesome-free/css/all.min.css';

import localFont from "next/font/local";
import AuthProvidder from "@/context/AuthProvider";
const myFont = localFont({
  src: "./fonts/NeueHaasDisplayBold.woff2",
});

export const metadata: Metadata = {
  title: "VringStudios",
  description: "by Rupam",
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
          <Footer />

          <Toaster />
        </body>
      </AuthProvidder>
    </html>
  );
}
