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
        <form onSubmit={handleSearch} className="relative w-1/2">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-yellow-300 text-yellow-800 rounded-2xl py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-600 placeholder-yellow-700"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </form>
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
