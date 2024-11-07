import type { Field } from "payload";
import * as HeroIcons from "@heroicons/react/24/outline";

import deepMerge from "@/lib/utilities/deepMerge";

// Create a list of all available Heroicons
export const iconOptions = Object.keys(HeroIcons).map((iconName) => ({
  label: iconName,
  value: iconName,
}));

type IconType = (options?: { overrides?: Record<string, unknown> }) => Field;

export const icon: IconType = ({ overrides = {} } = {}) => {
  const iconField: Field = {
    name: "icon",
    type: "group",
    fields: [
      {
        name: "name",
        type: "select",
        admin: {
          isClearable: true,
          description: "Select an icon from the Heroicons library",
        },
        options: iconOptions,
      },
      {
        name: "size",
        type: "select",
        defaultValue: "md",
        options: [
          { label: "Small", value: "sm" },
          { label: "Medium", value: "md" },
          { label: "Large", value: "lg" },
        ],
      },
      {
        name: "color",
        type: "text",
        admin: {
          description:
            "Enter a valid CSS color value (e.g., #000000, rgb(0,0,0), black)",
        },
      },
    ],
  };

  return deepMerge(iconField, overrides);
};
