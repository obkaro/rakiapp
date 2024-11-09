import type { CollectionConfig } from "payload";

import { isAdmin } from "@/payload/access/isAdmin";
import { anyone } from "@/payload/access/anyone";
import { authenticated } from "@/payload/access/authenticated";
import { setUserConnection } from "./hooks/setUserConnection";

export const Vendors: CollectionConfig = {
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
    useAsTitle: "displayName",
  },
  hooks: {
    afterChange: [setUserConnection],
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      admin: {
        position: "sidebar",
        readOnly: true,
      },
    },
    {
      name: "status",
      type: "select",
      options: ["pending", "approved", "blocked", "rejected", "inactive"],
      admin: {
        position: "sidebar",
        readOnly: true,
      },
    },
    {
      name: "companyName",
      type: "text",
      required: true,
      admin: {
        description: "The legal name of your business",
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Company",
          fields: [
            {
              name: "displayName",
              type: "text",
              required: true,
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
          ],
        },
        {
          label: "Contact",
          fields: [
            {
              name: "locations",
              type: "array",
              required: true,
              interfaceName: "Location",
              fields: [
                {
                  name: "name",
                  type: "text",
                  required: true,
                  admin: {
                    description: "Name to display for this location",
                  },
                },
                {
                  name: "addressLine1",
                  type: "text",
                  required: true,
                },
                {
                  name: "addressLine2",
                  type: "text",
                },
                {
                  name: "city",
                  type: "text",
                  required: true,
                },
                {
                  name: "state",
                  type: "text",
                },
                {
                  name: "zipOrPostalCode",
                  type: "text",
                },
                {
                  name: "country",
                  type: "text",
                  required: true,
                },
                {
                  name: "phone",
                  type: "text",
                  required: true,
                  admin: {
                    description:
                      "Phone number for this location. Do not include country code",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "logo",
      type: "upload",
      required: true,
      relationTo: "media",
      admin: {
        position: "sidebar",
      },
    },
  ],
};
