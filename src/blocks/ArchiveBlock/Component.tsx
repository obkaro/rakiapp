import type {
  Service,
  ArchiveBlock as ArchiveBlockProps,
} from "@/payload-types";

import configPromise from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import React from "react";
import RichText from "@/components/RichText";

import { CollectionArchive } from "@/components/CollectionArchive";
import { City } from "@/payload-types";

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string;
  }
> = async (props) => {
  const {
    id,
    categories,
    introContent,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    locations, // Add this line
  } = props;

  const limit = limitFromProps || 3;

  let services: Service[] = [];

  if (populateBy === "collection") {
    const payload = await getPayloadHMR({ config: configPromise });

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === "object") return category.id;
      else return category;
    });

    const flattenedLocations = locations?.map((location) => {
      if (typeof location === "object") return location.id;
      else return location;
    });

    const fetchedServices = await payload.find({
      collection: "services",
      depth: 1,
      limit,
      // ...(flattenedCategories && flattenedCategories.length > 0
      //   ? {
      //       where: {
      //         categories: {
      //           in: flattenedCategories,
      //         },
      //       },
      //     }
      //   : {}),
      ...(flattenedLocations && flattenedLocations.length > 0
        ? {
            where: {
              city: {
                in: flattenedLocations,
              },
            },
          }
        : {}),
    });

    services = fetchedServices.docs;
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((service) => {
        if (typeof service.value === "object") return service.value;
      }) as Service[];

      services = filteredSelectedPosts;
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText
            className="ml-0 max-w-[48rem]"
            content={introContent}
            enableGutter={false}
          />
        </div>
      )}
      <CollectionArchive services={services} />
    </div>
  );
};
