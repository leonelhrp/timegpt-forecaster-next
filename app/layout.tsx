import { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react';
import localFont from '@next/font/local'
import "../styles/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    template: '%s | Nixtla',
    default:
      'Nixtla - Forecasting made Simple',
  },
  description: `👋 Welcome to Nixtla's forecasting app, your one- stop 🎯 solution for predicting your time series with precision powered by TimeGPT.`,
  openGraph: {
    title: "Nixtla - Forecasting made Simple",
    description:
      `👋 Welcome to Nixtla's forecasting app, your one- stop 🎯 solution for predicting your time series with precision powered by TimeGPT.`,
    images: [
      {
        url: "https://raw.githubusercontent.com/leonelhrp/timegpt-forecaster-next/main/public/logo_mid.png",
      },
    ],
  },
  themeColor: "#FFF",
  icons: {
    icon: ['/favicon.ico']
  },
};

const nunito = localFont({
  src: [
    {
      path: '../public/fonts/Nunito-Variable.ttf',
      weight: '400'
    },
  ],
  variable: '--font-nunito'
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunito.variable} font-sans`}>
      <body className="scroll-smooth antialiased">
        <div className="flex w-full">
          <div className="relative flex w-full flex-col">
            <Header />
            <main className="flex-auto">
              {children}
            </main>
            <Footer />
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
