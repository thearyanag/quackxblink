"use client";
import Image from "next/image";
import BlinkCard, { CardProps } from "./BlinkCard";

export default function Validator() {
  const cubik: CardProps = {
    name: "Donate to Cubik",
    description:
      "A decentralized grants distribution platform for solana community",
    image: "https://utfs.io/f/a561906a-e38f-465c-94ac-6cfd96081c2e-1t0hkp.png",
    buttons: [
      { label: "Donate 1 USDC", onClick: () => console.log("5 min clicked") },
      { label: "Donate 5 USDC", onClick: () => console.log("10 min clicked") },
      { label: "Donate 10 USDC", onClick: () => console.log("15 min clicked") },
    ],
    inputText: "SOL Amount",
    borderColor: "green",
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h1 className="text-2xl mb-4 font-bold text-yellow-800">Validator</h1>
      <hr className="mb-4 border-yellow-400" />
      <div className="mb-4">
        <input
          type="text"
          placeholder="https://blink.quack.fun"
          className="w-full p-2 bg-yellow-300 text-yellow-800 rounded-2xl"
        />
      </div>
      <div className="flex justify-center">
        <div className="w-1/2">
          <BlinkCard {...cubik} />
        </div>
      </div>
      <div className="mt-2 text-center">
        <span className="bg-gray-700 p-2 rounded text-m">
          <strong>https://blinks.cubik.so/contribution/cubik</strong>
        </span>
      </div>
    </div>
  );
}
