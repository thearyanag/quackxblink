import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SolanaWalletProvider from "@/providers/SolanaWalletProvider";
import { Suspense } from "react";
import BottomNavBar from "./components/BottomNavBar";
import LayoutBody from "./components/LayoutBody";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quack",
  description: "Discover and post blinks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense>
          <SolanaWalletProvider>
            <LayoutBody>
            {children}
            </LayoutBody>
          </SolanaWalletProvider>
        </Suspense>
      </body>
    </html>
  );
}
