import clsx from "clsx";
import React from "react";

export function Grid(props: React.ComponentProps<"ul">) {
  const { children, className } = props;
  return (
    <ul
      {...props}
      className={clsx(
        "container grid gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8",
        className
      )}
    >
      {children}
    </ul>
  );
}

function GridItem(props: React.ComponentProps<"li">) {
  const { children, className } = props;
  return (
    <li {...props} className={clsx("transition-opacity", className)}>
      {children}
    </li>
  );
}

Grid.Item = GridItem;
