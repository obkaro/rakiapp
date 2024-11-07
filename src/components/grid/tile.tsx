import type { Media as MediaType } from "@/payload-types";

import { Media } from "@/components/Media";
import { Label } from "@/components/Label";
import clsx from "clsx";
import React from "react";

export function GridTileImage({
  active,
  isInteractive = true,
  label,
  ...props
}: {
  active?: boolean;
  isInteractive?: boolean;
  label?: {
    amount: number;
    currencyCode: string;
    position?: "bottom" | "center";
    title: string;
    summary?: string;
  };
  media: MediaType;
}) {
  return (
    <div
      className={clsx(
        "group flex w-full h-full items-center justify-center overflow-hidden border bg-white hover:border-gray-500 dark:bg-black",
        {
          "border-2 border-gray-500": active,
          "border-neutral-200 dark:border-neutral-800": !active,
          relative: label,
        }
      )}
    >
      {props.media ? (
        // eslint-disable-next-line jsx-a11y/alt-text -- `alt` is inherited from `props`, which is being enforced with TypeScript
        <Media
          className={clsx("relative object-cover w-full h-full", {
            "transition duration-200 ease-in-out group-hover:scale-105": isInteractive,
          })}
          // height={80}
          imgClassName="h-full w-full object-cover aspect-[4/3]"
          resource={props.media}
          //width={80}
        />
      ) : null}
      {label ? (
        <Label
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
          title={label.title}
          summary={label.summary}
        />
      ) : null}
    </div>
  );
}
