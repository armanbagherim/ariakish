import type { Metadata } from "next";
import "./globals.scss";
import Header from "./_components/design/Header";
import Footer from "./_components/design/Footer";
import { ToastContainer } from "react-toastify";
import NextTopLoader from "nextjs-toploader";

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
        <ToastContainer />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
