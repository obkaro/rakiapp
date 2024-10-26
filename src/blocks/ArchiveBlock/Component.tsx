import type {
  Service,
  ArchiveBlock as ArchiveBlockProps,
} from "@/payload-types";

import configPromise from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import React from "react";
import RichText from "@/components/RichText";

import { CollectionArchive } from "@/components/CollectionArchive";

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
  } = props;

  const limit = limitFromProps || 3;

  let services: Service[] = [];

  if (populateBy === "collection") {
    const payload = await getPayloadHMR({ config: configPromise });

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === "object") return category.id;
      else return category;
    });

    const fetchedServices = await payload.find({
      collection: "services",
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
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
          <h2 className="text-2xl font-bold">ahdahsdjfashdbfkja</h2>
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
