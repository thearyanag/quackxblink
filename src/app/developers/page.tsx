"use client";
import { useState } from "react";
import Validator from "@/app/components/Validator";
import Properties from "@/app/components/Properties";

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
}


export default function Page() {
  const [fetchedData, setFetchedData] = useState<IProperties | null>(null);

  const handleDataFetched = (data : IProperties) => {
    setFetchedData(data);
  };

  return (
    <div className="flex min-h-screen bg-yellow-50">
      <Validator onDataFetched={handleDataFetched} />
      <Properties data={fetchedData} />
    </div>
  );
}