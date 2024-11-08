import type { CollectionConfig } from "payload";

import { anyone } from "@/payload/access/anyone";
import { authenticated } from "@/payload/access/authenticated";
import { isAdmin } from "../access/isAdmin";

const Categories: CollectionConfig = {
  slug: "categories",
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
  ],
};

export default Categories;
