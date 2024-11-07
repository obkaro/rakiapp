"use client";
import { useHeaderTheme } from "@/lib/providers/HeaderTheme";
import React, { useEffect, useState } from "react";

import type { City, Page } from "@/payload-types";

import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";
import RichText from "@/components/RichText";
import { SelectLocation } from "@/components/SelectLocation";

import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";
import { CollectionAfterChangeHook } from "payload";

export const HighImpactHero: React.FC<Page["hero"]> = ({
  links,
  media,
  richText,
}) => {
  const { setHeaderTheme } = useHeaderTheme();
  const [cities, setCities] = useState<City[]>([]);
  // const destinations = [
  //   "Lagos, Nigeria",
  //   "Cape Town, South Africa",
  //   "Marrakech, Morocco",
  //   "Victoria Falls, Zambia/Zimbabwe",
  //   "Serengeti National Park, Tanzania",
  //   "Cairo, Egypt",
  //   "Zanzibar, Tanzania",
  // ];

  // const afterChangeHook: CollectionAfterChangeHook = async ({
  //   req: { payload },
  // }) => {
  //   const destinations = await payload.find({
  //     collection: "cities",
  //   });
  //   const cityNames = destinations.docs.map(
  //     (city: City) => city["display name"]
  //   );
  //   setCityNames(cityNames);
  // };

  useEffect(() => {
    setHeaderTheme("dark");

    const fetchCityNames = async () => {
      try {
        const response = await fetch("/api/cities"); // Assuming you have an API route for this
        const cities = await response.json();
        setCities(cities.docs);
      } catch (error) {
        console.error("Failed to fetch city names:", error);
      }
    };

    fetchCityNames();
  }, []);

  return (
    <div
      className="relative -mt-[10.4rem] flex items-end text-white"
      data-theme="dark"
    >
      <div className="container mb-8 z-10 relative">
        <div className="max-w-[34rem]">
          {richText && (
            <RichText
              className="mb-12"
              content={richText}
              enableGutter={false}
            />
          )}
          <SelectLocation locations={cities} />
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="min-h-[50vh] select-none">
        {media && typeof media === "object" && (
          <React.Fragment>
            <Media
              fill
              imgClassName="-z-10 object-cover"
              priority
              resource={media}
            />
            <div className="absolute pointer-events-none left-0 bottom-0 w-full h-full bg-gradient-to-t from-black via-black/20 to-black/20">
              <div className="absolute left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};
