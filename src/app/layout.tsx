import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SolanaWalletProvider from "@/providers/SolanaWalletProvider";
import { Suspense } from "react";
import BottomNavBar from "./components/BottomNavBar";
import { APP_TITLE, APP_DESCRIPTION } from "@/app/utils/const";
import LayoutBody from "./components/LayoutBody";
import { headers } from "next/headers";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  let title = APP_TITLE;
  let description = APP_DESCRIPTION;

  title = `${APP_TITLE} | Developers`;
  description = `Developers | ${APP_DESCRIPTION}`;

  return {
    title: {
      default: title,
      template: `%s | ${APP_TITLE}`,
    },
    description,
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
        { url: "/icons/icon-512x192.png", sizes: "512x512" },
      ],
      shortcut: "/favicon.ico",
    },
    manifest: "/manifest.json",
    viewport: {
      width: "device-width",
      initialScale: 1,
      minimumScale: 1,
      viewportFit: "cover",
    },
  };
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
            <LayoutBody>{children}
              <Analytics />
            </LayoutBody>
          </SolanaWalletProvider>
        </Suspense>
      </body>
    </html>
  );
}
