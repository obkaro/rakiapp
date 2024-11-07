import type { Service } from "@/payload-types";

import { Grid } from "@/components/grid";
import { GridTileImage } from "@/components/grid/tile";
import Link from "next/link";
import React from "react";

export function ServiceGridItems({ services }: { services: Service[] }) {
  return (
    <React.Fragment>
      {services.map((service) => {
        const image =
          service.gallery?.[0]?.image &&
          typeof service.gallery[0].image !== "string"
            ? service.gallery[0].image
            : undefined;

        if (!image) return null;
        return (
          <Grid.Item className="animate-fadeIn" key={service.id}>
            <Link
              className="relative inline-block w-full h-full"
              href={`/service/${service.slug}`}
            >
              <GridTileImage
                label={{
                  amount: 50,
                  currencyCode: "USD",
                  title: service.title,
                  summary: service.summary,
                }}
                media={image}
              />
            </Link>
          </Grid.Item>
        );
      })}
    </React.Fragment>
  );
}
