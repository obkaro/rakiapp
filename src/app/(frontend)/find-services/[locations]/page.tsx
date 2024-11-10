import { Grid } from "@/components/grid";
import { ServiceGridItems } from "@/features/services/components/ServiceGridItems";
import configPromise from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import React from "react";
import { Metadata } from "next";

type Props = {
  params: { locations: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const location = await params.locations;
  return {
    title: `Adventures in ${location}`,
    description: `Find adventures in ${location}.`,
  };
}

export default async function ServicesByLocationPage({ params }: Props) {
  const location = await params.locations;

  const payload = await getPayloadHMR({ config: configPromise });

  // console.log("location", location);

  // Get the category id so we can search for products that belong to this category
  const cityDoc = (
    await payload.find({
      collection: "cities",
      where: {
        slug: { equals: location },
      },
    })
  ).docs?.[0];

  // console.log(cityDoc);
  const services = await payload.find({
    collection: "services",
    //...(sort ? { sort } : { sort: "title" }),
    where: {
      city: { contains: cityDoc?.id },
    },
  });
  //const resultsText = services.docs.length > 1 ? "results" : "result";
  // console.log("services", services);
  return (
    <React.Fragment>
      {location ? (
        <h1 className="mt-12 mb-8 container text-3xl">
          {services.docs?.length === 0
            ? `No hits found for `
            : `Adventures in `}
          {
            <span className="font-bold not-italic text-4xl">
              {cityDoc?.["display name"]}
            </span>
          }
        </h1>
      ) : null}
      {services?.docs.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ServiceGridItems services={services.docs} />
        </Grid>
      ) : null}
    </React.Fragment>
  );
}
