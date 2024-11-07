import clsx from "clsx";
import React from "react";

import { Price } from "@/components/Price";

export const Label = ({
  amount,
  currencyCode,
  position = "bottom",
  title,
  summary,
}: {
  amount: number;
  currencyCode: string;
  position?: "bottom" | "center";
  title: string;
  summary?: string;
}) => {
  return (
    <div
      className={clsx(
        "absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label rounded-lg transition duration-200 ease-in-out group-hover:scale-102",
        {
          "lg:px-20 lg:pb-[35%]": position === "center",
        }
      )}
    >
      <div className="flex flex-col border rounded-2xl bg-white/70 p-3 font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
        <h3 className="mb-2 line-clamp-2 leading-tight tracking-tight">
          {title}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-sm font-light text-gray-700 dark:text-gray-200">
            {summary}
          </p>
          <Price
            amount={amount}
            className="flex-none text-xs rounded-full bg-blue-600 p-2 text-white ml-2"
            currencyCode={currencyCode}
            currencyCodeClassName="hidden @[275px]/label:inline"
          />
        </div>
      </div>
    </div>
  );
};
