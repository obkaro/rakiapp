import type { CollectionConfig } from "payload";

export const FocusAreas: CollectionConfig = {
  slug: "focus-areas",
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
    },
  ],
};
