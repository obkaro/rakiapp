import type { CollectionConfig } from "payload";

import { anyone } from "@/payload/access/anyone";
import { authenticated } from "@/payload/access/authenticated";
import { slugField } from "@/payload/fields/slug";

import type { Slug } from "@/payload/fields/slug";

import { isAdmin } from "@/payload/access/isAdmin";

import { generatePreviewPath } from "@/lib/utilities/generatePreviewPath";

const Cities: CollectionConfig = {
  slug: "cities",
  access: {
    read: anyone,
    create: isAdmin,
    delete: isAdmin,
    update: isAdmin,
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
    hidden: ({ user }) => {
      return user?.isAdmin ? false : true;
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
