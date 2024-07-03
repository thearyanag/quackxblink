"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import BlinkCard, { CardProps } from "./BlinkCard";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface Action {
  label: string;
  href: string;
  parameters?: Array<{
    name: string;
    label: string;
  }>;
}

interface IProperties {
  label: string;
  title: string;
  icon: string;
  description: string;
  links: {
    actions: Action[];
  };
  apiPath: string;
}

const findFirstParameterLabel = (actions: Action[]): string => {
  for (const action of actions) {
    if (action.parameters && action.parameters.length > 0) {
      return action.parameters[0].label;
    }
  }
  return "SOL Amount"; // Default value if no parameter is found
};

export default function Validator({
  onDataFetched,
}: {
  onDataFetched: (data: IProperties) => void;
}) {
  const defaultURL = "https://www.cubik.so/p/quack";
  let [inputUrl, setInputUrl] = useState("");
  const [cardData, setCardData] = useState<CardProps | null>(null);
  const [inputAddress, setInputAddress] = useState("");
  const [baseDomain, setBaseDomain] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUrl(e.target.value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAddress(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (!inputUrl) inputUrl = defaultURL;
      const response = await fetch(
        `/api/developer?url=${encodeURIComponent(inputUrl)}`
      );
      const data = await response.json();

      const inputText = findFirstParameterLabel(data.links.actions);

      console.log("Fetched data:", data);

      setCardData({
        name: data.title,
        description: data.description,
        image: data.icon, // Use the icon field for the image
        buttons: data.links.actions.map((action: Action) => ({
          label: action.label,
          onClick: () => console.log(`Clicked: ${action.label}`),
        })),
        inputText: inputText,
        borderColor: "green",
      });

      console.log("Base Domain:")
      console.log(baseDomain)
      setBaseDomain(data.apiPath);

      onDataFetched(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    setInputUrl(defaultURL);
    handleSubmit();
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h1 className="text-2xl mb-4 font-bold text-yellow-800">Validator</h1>
      <hr className="mb-4 border-yellow-400" />
      <div className="mb-4 flex">
        <input
          type="text"
          value={inputUrl}
          onChange={handleInputChange}
          placeholder="https://blink.quack.fun"
          className="w-full p-2 bg-yellow-300 text-yellow-800 rounded-l-2xl"
        />
        <button
          onClick={handleSubmit}
          className="bg-yellow-500 text-yellow-900 px-4 rounded-r-2xl hover:bg-yellow-600"
        >
          Fetch
        </button>
      </div>
      <div className="mb-4 flex">
        <input
          type="text"
          value={inputAddress}
          onChange={handleAddressChange}
          placeholder="3LSKaEYJx55PMe3VgNgKqN4nHpRvD9iT2gnwnS4hckVL"
          className="w-full p-2 bg-yellow-300 text-yellow-800 rounded-l-2xl"
        />
      </div>
      {cardData && (
        <div className="flex justify-center">
          <div className="w-1/2">
            <BlinkCard {...cardData} />
          </div>
        </div>
      )}
      <div className="mt-2 text-center">
        <span className="bg-gray-700 p-2 rounded text-m">
          <strong>{baseDomain}</strong>{" "}
          <CopyToClipboard
            text={baseDomain}
            onCopy={() => alert("Copied to clipboard")}
          >
            <button className="italic">Copy</button>
          </CopyToClipboard>
        </span>
      </div>
    </div>
  );
}
