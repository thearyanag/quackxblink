"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";

const TopNavBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isToggled, setIsToggled] = useState(true);
  const { select, connect, publicKey, connected, disconnect } = useWallet();

  async function logout() {
    await disconnect();
  }

  const handleToggle = () => {
    setIsToggled(!isToggled);
    // Implement toggle functionality here
    logout();
  };
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", searchQuery);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-yellow-400 text-yellow-800 p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Quack
        </Link>
        <button
          onClick={handleToggle}
          className={`w-12 h-6 flex items-center rounded-full p-1 ${
            isToggled ? "bg-green-400" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
              isToggled ? "translate-x-6" : ""
            }`}
          ></div>
        </button>
      </div>
    </nav>
  );
};

export default TopNavBar;
