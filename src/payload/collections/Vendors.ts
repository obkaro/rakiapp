import type { CollectionConfig } from "payload";

const Vendors: CollectionConfig = {
  slug: "vendors",
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
    },
    {
      name: "status",
      type: "select",
      options: ["pending", "approved", "blocked", "rejected", "inactive"],
    },
    {
      name: "displayName",
      type: "text",
    },
  ],
};

export default Vendors;
