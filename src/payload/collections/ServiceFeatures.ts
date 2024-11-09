import type { CollectionConfig } from "payload";

const ServiceFeatures: CollectionConfig = {
  slug: "service-features",
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
      name: "description",
      type: "textarea",
    },
  ],
};

export default ServiceFeatures;
