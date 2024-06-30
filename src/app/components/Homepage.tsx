// page.tsx or HomePage.tsx
"use client";

import React from "react";
import BlinkCard, { CardProps } from "./BlinkCard";

// Dummy data
const dummyBlinkCards: CardProps[] = [
  {
    name: "Buy SOL with USDC",
    description:
      "Buy SOL with USDC. Choose a USD amount of USDC from the options below, or enter a custom amount.",
    image:
      "https://ucarecdn.com/bb6ebebc-a810-4943-906d-5e3c2ca17b8d/-/preview/880x880/-/quality/smart/-/format/auto/",
    buttons: [
      { label: "$10", onClick: () => console.log("5 min clicked") },
      { label: "$100", onClick: () => console.log("10 min clicked") },
      { label: "$1000", onClick: () => console.log("15 min clicked") },
    ],
    inputText: "Enter custom USDC amount",
    borderColor: "green",
  },
  {
    name: "Somos Axolotls Donation",
    description: "If you wish to make your crypto currency donation a tax deductible gift, please email us at info@somosaxolotl.com to receive information.",
    image: "https://firebasestorage.googleapis.com/v0/b/sphere-labs-production.appspot.com/o/product-images%2Fd3fe7f24-ca9b-4af2-abcd-290b5c4f5146.jpg?alt=media",
    buttons: [
      { label: "Donate 1 USDC", onClick: () => console.log("15 min clicked") },
      { label: "Donate 5 USDC", onClick: () => console.log("20 min clicked") },
      { label: "Donate 10 USDC", onClick: () => console.log("30 min clicked") },
    ],
    inputText: "Amount",
    borderColor: "red",
  },
  {
    name: "Donate to Cubik",
    description: "A decentralized grants distribution platform for solana community",
    image: "https://utfs.io/f/a561906a-e38f-465c-94ac-6cfd96081c2e-1t0hkp.png",
    buttons: [
      { label: "Donate 1 USDC", onClick: () => console.log("5 min clicked") },
      { label: "Donate 5 USDC", onClick: () => console.log("10 min clicked") },
      { label: "Donate 10 USDC", onClick: () => console.log("15 min clicked") },
    ],
    inputText: "SOL Amount",
    borderColor: "green",
  },
  // Add more dummy data as needed
];

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen my-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyBlinkCards.map((card, index) => (
            <div key={index} className="w-full">
              <BlinkCard
                name={card.name}
                description={card.description}
                image={card.image}
                buttons={card.buttons}
                borderColor={card.borderColor as "yellow" | "orange" | "red"}
                inputText={card.inputText}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
