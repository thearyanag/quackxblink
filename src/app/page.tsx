"use client";

import Image from "next/image";
import { GoogleViaTipLinkWalletName } from "@tiplink/wallet-adapter";
import { useWallet } from "@solana/wallet-adapter-react";
import LoginScreen from "./components/LoginScreen";
import HomePage from "./components/Homepage";
import Landing from "./components/Landing";

export default function Home() {
  const { select, connect, publicKey, connected, disconnect } = useWallet();

  // call this function upon button click
  async function loginViaTipLink() {
    select(GoogleViaTipLinkWalletName);
  }

  async function logout() {
    await disconnect();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-yellow-50">
      {/* {!connected ? (
        <LoginScreen onGoogleLogin={loginViaTipLink} />
      ) : (
        <HomePage />
      )} */}

      <Landing />
    </main>
  );
}
