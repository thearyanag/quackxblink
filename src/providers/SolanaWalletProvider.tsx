"use client";

import React, { FC, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import dynamic from "next/dynamic";
import "@solana/wallet-adapter-react-ui/styles.css";

import { TipLinkWalletAdapter } from "@tiplink/wallet-adapter";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
  TipLinkWalletAutoConnectV2,
} from "@tiplink/wallet-adapter-react-ui";

const ReactWalletModalProvider = dynamic(
  () =>
    import("@tiplink/wallet-adapter-react-ui").then(
      (mod) => mod.WalletModalProvider
    ),
  { ssr: false }
);

export default function SolanaWalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const wallets = useMemo(
    () => [
      new TipLinkWalletAdapter({
        title: "Quack.fun",
        clientId: "--",
        theme: "dark", // pick between "dark"/"light"/"system"
      }),
    ],
    []
  );

  const searchParams = useSearchParams();

  return (
    <WalletProvider wallets={wallets} autoConnect>
      <Suspense>
        <TipLinkWalletAutoConnectV2 isReady query={searchParams}>
          <ReactWalletModalProvider>{children}</ReactWalletModalProvider>
        </TipLinkWalletAutoConnectV2>
      </Suspense>
    </WalletProvider>
  );
}
