import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SolanaWalletProvider from "@/providers/SolanaWalletProvider";
import { Suspense } from "react";
import BottomNavBar from "./components/BottomNavBar";
import { APP_TITLE, APP_DESCRIPTION } from "@/app/utils/const"
import LayoutBody from "./components/LayoutBody";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: APP_TITLE,
    template: `%s | ${APP_TITLE}`,
  },
  description: APP_DESCRIPTION,
  applicationName: APP_TITLE,
  appleWebApp: {
    capable: true,
    title: APP_TITLE,
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: "#FFFFFF",
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192" },
      { url: "/icons/icon-384x384.png", sizes: "384x384" },
      { url: "/icons/icon-512x512.png", sizes: "512x512" },
    ],
    apple: [
      { url: "/icons/icon-192x192.png", sizes: "192x192" },
      { url: "/icons/icon-384x384.png", sizes: "384x384" },
      { url: "/icons/icon-512x512.png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  // twitter: {
  //   card: "summary",
  //   title: APP_TITLE,
  //   description: APP_TITLE,
  //   creator: "@quack_fun",
  //   images: [`${}/icons/icon-192x192.png`],
  // },
  // openGraph: {
  //   type: "website",
  //   title: APP_TITLE,
  //   description: APP_TITLE,
  //   siteName: APP_TITLE,
  //   url: ,
  //   images: [
  //     {
  //       url: `${}/icons/icon-192x192.png`,
  //       width: 192,
  //       height: 192,
  //     },
  //   ],
  // },
  viewport: {
    width: "device-width",
    initialScale: 1,
    minimumScale: 1,
    viewportFit: "cover",
  },
}

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
