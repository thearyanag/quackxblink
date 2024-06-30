'use client';
import React, { useState } from "react";
import Image from "next/image";

type BorderColor = "yellow" | "orange" | "red" | "green";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

export interface CardProps {
  name: string;
  description: string;
  image?: string;
  buttons: ButtonProps[];
  borderColor?: BorderColor;
  inputText?: string;
}

const BlinkCard: React.FC<CardProps> = ({
  name,
  description,
  image,
  buttons,
  borderColor = "yellow",
  inputText = "Enter text",
}) => {
  const [showInput, setShowInput] = useState<boolean>(true);

  const getBorderColor = (color: BorderColor): string => {
    switch (color) {
      case "yellow":
        return "border-yellow-400";
      case "orange":
        return "border-orange-400";
      case "red":
        return "border-red-400";
      case "green":
        return "border-green-400";
      default:
        return "border-yellow-400";
    }
  };

  return (
    <div
      className={`w-full bg-yellow-100 text-yellow-900 p-4 rounded-lg border-2 ${getBorderColor(
        borderColor
      )} shadow-lg hover:shadow-xl transition-shadow duration-300`}
    >
      <div className="mb-2">
        <div className="font-bold text-xl">{name}</div>
        <div className="text-sm text-yellow-700">{description}</div>
      </div>
      <div className="mb-4 overflow-hidden rounded-lg">
        {image ? (
          <Image
            src={image}
            alt="Card image"
            layout="responsive"
            width={1200}
            height={675}
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center bg-yellow-200 text-yellow-600">
            No Image
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {buttons.map((button, index) => (
          <button
            key={index}
            className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full hover:bg-yellow-500 transition-colors duration-200"
            onClick={() => {
              button.onClick();
              setShowInput(!showInput);
            }}
          >
            {button.label}
          </button>
        ))}
      </div>
      {showInput && (
        <input
          type="text"
          className="w-full bg-yellow-50 text-yellow-900 px-3 py-2 rounded-full border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder={inputText}
        />
      )}
    </div>
  );
};

export default BlinkCard;
