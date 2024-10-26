import React from "react";
import * as HeroIcons from "@heroicons/react/24/outline";
import { cn } from "src/utilities/cn";

type IconName = keyof typeof HeroIcons;

type CMSIconType = {
  name?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
};

export const CMSIcon: React.FC<CMSIconType> = (props) => {
  const { name, size = "md", color, className } = props;

  if (!name) return null;

  const IconComponent = HeroIcons[name];

  if (!IconComponent) return null;

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-16 w-16",
  };

  return (
    <IconComponent
      name={name}
      className={cn(sizeClasses[size], className)}
      style={{ color }}
      aria-hidden="true"
    />
  );
};
