'use client'
import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Header from "./components/global/header";
import Footer from "./components/global/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <SessionProvider>
          <header className="top-0 fixed w-full">
            <Header />
          </header>
          <main className="pt-24">

            {children}
          </main>
          <footer className="w-full">
            <Footer />
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}
