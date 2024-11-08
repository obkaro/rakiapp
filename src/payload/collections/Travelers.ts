import type { CollectionConfig } from "payload";

import { isAdmin } from "@/payload/access/isAdmin";
import { anyone } from "@/payload/access/anyone";
import { authenticated } from "../access/authenticated";

const Travelers: CollectionConfig = {
  slug: "travelers",
  access: {
    create: authenticated,
    delete: isAdmin,
    read: anyone,
    update: authenticated,
  },
  admin: {
    hidden: ({ user }) => {
      return user?.isAdmin ? false : true;
    },
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
    },
    {
      name: "status",
      type: "select",
      options: ["pending", "approved"],
    },
    {
      name: "displayName",
      type: "text",
    },
  ],
};

export default Travelers;
