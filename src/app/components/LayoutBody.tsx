"use client";
import React from "react";
import BottomNavBar from "./BottomNavBar";
import TopNavBar from "./TopNavBar";
import { useWallet } from "@solana/wallet-adapter-react";
import { usePathname } from 'next/navigation';

export default function LayoutBody({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { publicKey, connected } = useWallet();
  const pathname = usePathname();

  // let showNavbar = connected && pathname !== '/developers';
  let showNavbar = false;
  return (
    <div className={`flex flex-col min-h-screen`}>
      {showNavbar && <TopNavBar />}
      <div className={`flex-grow ${showNavbar ? "py-16" : ""}`}>{children}</div>
      {showNavbar && <BottomNavBar />}
    </div>
  );
}