"use client";
import { Inter } from "next/font/google";
import React from "react";
import BottomNavBar from "./BottomNavBar";
import TopNavBar from "./TopNavBar";
import { useWallet } from "@solana/wallet-adapter-react";

export default function LayoutBody({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { publicKey, connected } = useWallet();
  return (
    <div className={`flex flex-col min-h-screen`}>
      {connected && <TopNavBar />}
      <div className={`flex-grow ${connected ? "py-16" : ""}`}>{children}</div>
      {connected && <BottomNavBar />}
    </div>
  );
}
