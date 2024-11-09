import type { CollectionConfig } from "payload";

import { generatePreviewPath } from "@/lib/utilities/generatePreviewPath";
import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  HTMLConverterFeature,
  InlineToolbarFeature,
  lexicalEditor,
  lexicalHTML,
} from "@payloadcms/richtext-lexical";

// import type { ServiceVariant } from "./ui/types";

// import { admins } from "@/access/admins";
// import { adminsOrPublished } from "@/access/adminsOrPublished";

import { CallToAction } from "@/payload/blocks/CallToAction/config";
import { Content } from "@/payload/blocks/Content/config";
import { MediaBlock } from "@/payload/blocks/MediaBlock/config";
import { slugField } from "@/payload/fields/slug";

// import { beforeProductChange } from "./hooks/beforeChange";
// import { deleteProductFromCarts } from "./hooks/deleteProductFromCarts";
// import { revalidateProduct } from "./hooks/revalidateProduct";

export const Services: CollectionConfig = {
  slug: "services",
  //   access: {
  //     create: admins,
  //     delete: admins,
  //     read: adminsOrPublished,
  //     update: admins,
  //   },
  admin: {
    defaultColumns: ["title", "stripeProductID", "_status"],
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === "string" ? data.slug : "",
          collection: "services",
        });
        return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`;
      },
    },
    preview: (doc) =>
      generatePreviewPath({
        slug: typeof doc?.slug === "string" ? doc.slug : "",
        collection: "services",
      }),
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      // admin: {
      //   description: "The title of the service you're offering",
      // },
      minLength: 4,
      maxLength: 72,
    },
    {
      name: "summary",
      type: "text",
      required: true,
      admin: {
        description: "A quick summary for potential customers to understand",
      },
      minLength: 12,
      maxLength: 124,
    },
    {
      type: "tabs",
      tabs: [
        {
          fields: [
            {
              name: "description",
              type: "richText",
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({
                      enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
                    }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                    HTMLConverterFeature(),
                  ];
                },
              }),
              label: false,
              required: true,
              admin: {
                description:
                  "Detailed description of the service you're offering. Feel free to use our rich text editor to style your content to your liking.",
              },
            },
            lexicalHTML("description", { name: "description_html" }),
            {
              name: "features",
              type: "relationship",
              relationTo: "service-features",
              hasMany: true,
              admin: {
                description:
                  "Select the features your service offers. Include as many as apply.",
              },
            },
            {
              name: "gallery",
              type: "array",
              required: true,
              fields: [
                {
                  name: "image",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                },
              ],
              labels: {
                plural: "Images",
                singular: "Image",
              },
            },
          ],
          label: "Details",
          admin: {
            description:
              "Upload high quality images to showcase your service. This will help potential customers understand what you offer.",
          },
        },
      ],
    },
    {
      name: "skipSync",
      type: "checkbox",
      admin: {
        hidden: true,
        position: "sidebar",
        readOnly: true,
      },
      label: "Skip Sync",
    },
    {
      name: "serviceLine",
      type: "relationship",
      required: true,
      admin: {
        position: "sidebar",
        sortOptions: "title",
        description:
          "Select a service line your service belongs to. This helps us categorize your service, making it easier for customers to find.",
      },
      hasMany: false,
      relationTo: "service-lines",
      filterOptions: ({ data }) => {
        return {
          parent: {
            exists: false,
          },
        };
      },
    },
    {
      name: "focusAreas",
      type: "relationship",
      relationTo: "service-lines",
      required: true,
      hasMany: true,
      filterOptions: ({ data }) => {
        return {
          parent: {
            equals: data?.serviceLine,
          },
        };
      },
      admin: {
        position: "sidebar",
        sortOptions: "title",
        description:
          "Select all the focus areas your service addresses. Include as many as apply.",
      },
    },
    {
      name: "city",
      type: "relationship",
      relationTo: "cities",
      hasMany: true,
      admin: {
        position: "sidebar",
        sortOptions: "city name",
        description:
          "Select the city where your service will be offered. Include as many as apply",
      },
      required: true,
    },
    {
      name: "vendor",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      admin: {
        readOnly: true,
        position: "sidebar",
      },
    },
    ...slugField(),
    {
      name: "listedOn",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        position: "sidebar",
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === "published" && !value) {
              return new Date();
            }
            return value;
          },
        ],
      },
    },
  ],
  //   hooks: {
  //     afterChange: [revalidateProduct],
  //     afterDelete: [deleteProductFromCarts],
  //     beforeChange: [beforeProductChange],
  //   },
  versions: {
    drafts: {
      autosave: true,
    },
    maxPerDoc: 50,
  },
};
