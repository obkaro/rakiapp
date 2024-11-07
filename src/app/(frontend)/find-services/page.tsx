import { Grid } from "@/components/grid";
import { ServiceGridItems } from "@/features/services/components/ServiceGridItems";
import configPromise from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import React from "react";

import { Service } from "@/payload-types";

export const metadata = {
  description: "Adventures await!",
  title: "Browse Adventures",
};

export default async function ServicesPage({
  params,
}: {
  params: { location: string };
}) {
  const { location } = await params;
  const payload = await getPayloadHMR({ config: configPromise });

  // Get the category id so we can search for products that belong to this category
  const cityDoc = (
    await payload.find({
      collection: "cities",
      where: {
        slug: { equals: location },
      },
    })
  ).docs?.[0];

  console.log(cityDoc);
  const services = await payload.find({
    collection: "services",
    // //...(sort ? { sort } : { sort: "title" }),
    // where: {
    //   city: { contains: cityDoc?.id },
    // },
  });
  const resultsText = services.docs.length > 1 ? "results" : "result";

  return (
    <React.Fragment>
      {/* {location ? (
        <p className="mb-4">
          {services.docs?.length === 0
            ? "There are no products that match "
            : `Showing ${services.docs.length} ${resultsText} for `}
          <span className="font-bold">&quot;{location}&quot;</span>
        </p>
      ) : null} */}
      {services?.docs.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ServiceGridItems services={services.docs} />
        </Grid>
      ) : null}
    </React.Fragment>
  );
}
