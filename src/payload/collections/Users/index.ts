import type { CollectionConfig } from "payload";

import { authenticated } from "@/lib/access/authenticated";
import { anyone } from "@/lib/access/anyone";

import { updateDisplayName } from "./hooks/updateDisplayName";

const Users: CollectionConfig = {
  slug: "users",
  access: {
    admin: authenticated,
    create: anyone,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["displayName", "email"],
    useAsTitle: "displayName",
  },
  auth: true,
  fields: [
    {
      name: "displayName",
      type: "text",
    },
    {
      name: "firstName",
      type: "text",
    },
    {
      name: "lastName",
      type: "text",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "isVendor",
      type: "checkbox",
    },
    {
      name: "isTraveler",
      type: "checkbox",
    },
    {
      name: "isAdmin",
      type: "checkbox",
    },
  ],
  timestamps: true,
  hooks: {
    afterChange: [updateDisplayName],
  },
};

export default Users;
