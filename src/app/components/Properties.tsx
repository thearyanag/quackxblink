// components/Properties.tsx
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
  icon: string;
  description: string;
  links: {
    actions: Action[];
  };
}

const renderValue = (value: any): string => {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return `[${value.length} items]`;
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
};

const PropertyRow: React.FC<{ label: string; value: any }> = ({
  label,
  value,
}) => (
  <div className="flex flex-col sm:flex-row justify-between bg-gray-800 p-2 rounded">
    <span className="font-semibold mb-1 sm:mb-0">{label}</span>
    <CopyToClipboard text={renderValue(value)} onCopy={() => alert("Copied!")}>
      <button className="text-sm text-gray-400 hover:text-white">
        Copy
      </button>
    </CopyToClipboard>
      <span className="text-green-400 break-all">{renderValue(value)}</span>

  </div>
);

const Properties: React.FC<{ data: Properties | null }> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="w-full max-w-2xl p-4 border-l-2 border-yellow-800">
      <h2 className="text-xl mb-4 font-bold text-yellow-800">Properties</h2>
      <hr className="mb-4 border-yellow-400" />
      <div className="space-y-2">
        <PropertyRow label="label" value={data.label} />
        <PropertyRow label="title" value={data.title} />
        <PropertyRow label="icon" value={data.icon} />
        <PropertyRow label="description" value={data.description} />
        {data.links.actions.map((action, index) => (
          <React.Fragment key={index}>
            <PropertyRow
              label={`links:actions:${index}:label`}
              value={action.label}
            />

            <PropertyRow
              label={`links:actions:${index}:href`}
              value={action.href}
            />
            {action.parameters &&
              action.parameters.map((param, paramIndex) => (
                <React.Fragment key={paramIndex}>
                  <PropertyRow
                    label={`links:actions:${index}:parameters:${paramIndex}:name`}
                    value={param.name}
                  />
                  <PropertyRow
                    label={`links:actions:${index}:parameters:${paramIndex}:label`}
                    value={param.label}
                  />
                </React.Fragment>
              ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Properties;
