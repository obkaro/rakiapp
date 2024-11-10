import type { CollectionConfig } from "payload";

import { authenticated } from "@/payload/access/authenticated";
import { anyone } from "@/payload/access/anyone";
import { isAdmin } from "@/payload/access/isAdmin";
import { adminOrSelf } from "@/payload/access/adminOrSelf";
import { isTraveler } from "@/payload/access/isTraveler";
import { isVendor } from "@/payload/access/isVendor";

import { updateDisplayName } from "./hooks/updateDisplayName";

const Users: CollectionConfig = {
  slug: "users",
  access: {
    admin: ({ req: { user } }) => {
      return user?.isAdmin ? true : user?.isVendor ? true : false;
    },
    unlock: ({ req: { user } }) => {
      return user?.isAdmin ? true : false;
    },
    create: anyone,
    delete: isAdmin,
    read: adminOrSelf,
    update: adminOrSelf,
  },
  admin: {
    defaultColumns: ["displayName", "email"],
    useAsTitle: "displayName",
    hidden: ({ user }) => {
      return user?.isAdmin ? false : true;
    },
  },
  auth: {
    verify: true,
  },
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
    beforeChange: [updateDisplayName],
  },
};

export default Users;
