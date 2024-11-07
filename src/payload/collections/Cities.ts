import type { CollectionConfig } from "payload";

import { anyone } from "@/lib/access/anyone";
import { authenticated } from "@/lib/access/authenticated";
import { slugField } from "@/payload/fields/slug";

import type { Slug } from "@/payload/fields/slug";

import { generatePreviewPath } from "@/lib/utilities/generatePreviewPath";

const Cities: CollectionConfig = {
  slug: "cities",
  access: {
    read: anyone,
  },
  admin: {
    useAsTitle: "display name",
    preview: (data) => {
      const path = generatePreviewPath({
        slug: typeof data?.slug === "string" ? data.slug : "",
        collection: "pages",
      });

      return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`;
    },
  },
  fields: [
    {
      name: "city name",
      type: "text",
      required: true,
    },
    { name: "country", type: "text", required: true },
    { name: "display name", type: "text", required: true },
    ...slugField("display name"),
  ],
};

export default Cities;
