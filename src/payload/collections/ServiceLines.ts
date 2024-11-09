import type { CollectionConfig } from "payload";

import { anyone } from "@/payload/access/anyone";
import { authenticated } from "@/payload/access/authenticated";
import { isAdmin } from "../access/isAdmin";

const ServiceLines: CollectionConfig = {
  slug: "service-lines",
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: anyone,
    update: isAdmin,
  },
  admin: {
    useAsTitle: "title",
    hidden: ({ user }) => {
      return user?.isAdmin ? false : true;
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "features",
      type: "relationship",
      relationTo: "service-features",
      hasMany: true,
      admin: {
        condition: (data) => {
          return data.parent ? true : false;
        },
      },
    },
  ],
};

export default ServiceLines;
