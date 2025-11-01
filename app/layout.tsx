import type { Metadata } from "next";
import "./globals.scss";
import Header from "./_components/design/Header";
import Footer from "./_components/design/Footer";
import { ToastContainer } from "react-toastify";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from 'react-hot-toast';
import Script from 'next/script';

export const metadata: Metadata = {
  title: "آریا کیش | گارانتی و خدمات پس از فروش لوازم خانگی",
  description: "گارانتی و خدمات پس از فروش آریا کیش",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <body className={`antialiased`}>
        <NextTopLoader />
        <Toaster position="top-center" />
        <Header />
        {children}
        <Footer />
        {/* Google Analytics 4 Script - Loads the gtag.js library */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NDMDPTRSLN"
          strategy="afterInteractive"
        />
        {/* Google Analytics 4 Inline Script - Initializes gtag */}
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NDMDPTRSLN');
          `}
        </Script>
      </body>
    </html>
  );
}