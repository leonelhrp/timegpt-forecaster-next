import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <main className="scroll-smooth antialiased [font-feature-settings:'ss01']">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}

export default MyApp;
