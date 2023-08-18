import { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react';
import { Layout } from "@/components/Layout";
import "../styles/globals.css";

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
        url: "https://timegpt-forecaster-next.vercel.app/opengraph-image",
      },
    ],
  },
  themeColor: "#FFF",
  icons: {
    icon: ['/favicon.ico']
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="scroll-smooth antialiased [font-feature-settings:'ss01']">
        <div className="flex w-full">
          <Layout>{children}</Layout>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
