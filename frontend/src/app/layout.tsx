import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Geist, Geist_Mono } from "next/font/google";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "X-SENDER",
  description: "FB chatbot-аар Х тайлан илгээх систем",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white text-gray-800 dark:bg-black dark:text-white`}
      >
        <div className="max-w-3xl px-6 py-6 mx-auto">
          <Header />
          <main className="p-6 mt-8 shadow-md rounded-2xl bg-white/70 dark:bg-black/50 backdrop-blur-md">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
