import type { CollectionConfig } from "payload";

import { isAdmin } from "@/payload/access/isAdmin";
import { anyone } from "@/payload/access/anyone";
import { authenticated } from "@/payload/access/authenticated";

const Vendors: CollectionConfig = {
  slug: "vendors",
  access: {
    create: authenticated,
    delete: isAdmin,
    read: anyone,
    update: authenticated,
  },
  admin: {
    hidden: () => {
      return false;
    },
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "status",
      type: "select",
      options: ["pending", "approved", "blocked", "rejected", "inactive"],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "companyName",
      type: "text",
      admin: {
        description: "The legal name of your business",
      },
    },
    {
      name: "displayName",
      type: "text",
      admin: {
        description:
          "This is the name that will be displayed to potential travelers",
      },
    },
    {
      name: "website",
      type: "text",
    },
    {
      name: "tagline",
      type: "text",
      admin: {
        description: "A short tagline to describe your company",
      },
    },
    {
      name: "description",
      type: "textarea",
      admin: {
        description: "A brief description of your company",
      },
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      admin: {
        position: "sidebar",
      },
    },
  ],
};

export default Vendors;
