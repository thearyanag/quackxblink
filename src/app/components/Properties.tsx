// components/Properties.tsx
import React from 'react';

interface Action {
  label: string;
  href: string;
  parameters?: Array<{
    name: string;
    label: string;
  }>;
}

interface Properties {
  label: string;
  title: string;
  description: string;
  links: {
    actions: Action[];
  };
}

const properties: Properties = {
  label: "Donate SOL",
  title: "Donate to Cubik",
  description: "A decentralized grants distribution platform for solana community",
  links: {
    actions: [
      {
        label: "Donate 0.1 SOL",
        href: "/tip/tx?projectAccount=4LhThqpUeJmbmvRmu7pnbEah3KEDeW4LACdrqPFSnY5M&amount=0.1"
      },
      {
        label: "Donate 0.5 SOL",
        href: "/tip/tx?projectAccount=4LhThqpUeJmbmvRmu7pnbEah3KEDeW4LACdrqPFSnY5M&amount=0.5"
      },
      {
        label: "Donate 1 SOL",
        href: "/tip/tx?projectAccount=4LhThqpUeJmbmvRmu7pnbEah3KEDeW4LACdrqPFSnY5M&amount=1"
      },
      {
        label: "Donate SOL",
        href: "/tip/tx?projectAccount=4LhThqpUeJmbmvRmu7pnbEah3KEDeW4LACdrqPFSnY5M&amount={amount}",
        parameters: [
          {
            name: "amount",
            label: "SOL amount"
          }
        ]
      }
    ]
  }
};

const renderValue = (value: any): string => {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return `[${value.length} items]`;
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
};

const PropertyRow: React.FC<{ label: string; value: any }> = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row justify-between bg-gray-800 p-2 rounded">
    <span className="font-semibold mb-1 sm:mb-0">{label}</span>
    <span className="text-green-400 break-all">{renderValue(value)}</span>
  </div>
);

const Properties: React.FC = () => {
  return (
    <div className="w-full max-w-2xl p-4 border-l-2 border-yellow-800">
      <h2 className="text-xl mb-4 font-bold text-yellow-800">Properties</h2>
      <hr className="mb-4 border-yellow-400" />
      <div className="space-y-2">
        <PropertyRow label="label" value={properties.label} />
        <PropertyRow label="title" value={properties.title} />
        <PropertyRow label="description" value={properties.description} />
        {properties.links.actions.map((action, index) => (
          <React.Fragment key={index}>
            <PropertyRow label={`links:actions:${index}:label`} value={action.label} />
            <PropertyRow label={`links:actions:${index}:href`} value={action.href} />
            {action.parameters && action.parameters.map((param, paramIndex) => (
              <React.Fragment key={paramIndex}>
                <PropertyRow label={`links:actions:${index}:parameters:${paramIndex}:name`} value={param.name} />
                <PropertyRow label={`links:actions:${index}:parameters:${paramIndex}:label`} value={param.label} />
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Properties;