import type { CollectionConfig } from "payload";

const Travellers: CollectionConfig = {
  slug: "travellers",
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

export default Travellers;
