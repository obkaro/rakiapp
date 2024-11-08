import type { CollectionConfig } from "payload";

import { isAdmin } from "@/payload/access/isAdmin";

import { CallToAction } from "@/payload/blocks/CallToAction/config";
import { Content } from "@/payload/blocks/Content/config";
import { MediaBlock } from "@/payload/blocks/MediaBlock/config";

import { lexicalEditor } from "@payloadcms/richtext-lexical";

import {
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  HeadingFeature,
  ParagraphFeature,
  LinkFeature,
  StrikethroughFeature,
  AlignFeature,
  UnorderedListFeature,
  OrderedListFeature,
  BlockquoteFeature,
  InlineToolbarFeature,
  FixedToolbarFeature,
  HorizontalRuleFeature,
  UploadFeature,
} from "@payloadcms/richtext-lexical";

import { slugField } from "@/payload/fields/slug";

import { populatePublishedAt } from "@/lib/hooks/populatePublishedAt";
import { generatePreviewPath } from "@/lib/utilities/generatePreviewPath";

export const Emails: CollectionConfig = {
  slug: "emails",
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: isAdmin,
    update: isAdmin,
  },
  admin: {
    useAsTitle: "title",
    hidden: ({ user }) => {
      return user?.isAdmin ? false : true;
    },
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === "string" ? data.slug : "",
          collection: "emails",
        });
        return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`;
      },
    },
    preview: (data) => {
      const path = generatePreviewPath({
        slug: typeof data?.slug === "string" ? data.slug : "",
        collection: "emails",
      });
      return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`;
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
      type: "text",
    },
    {
      name: "body",
      type: "richText",
      required: true,
      editor: lexicalEditor({
        features: [
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          HeadingFeature(),
          ParagraphFeature(),
          LinkFeature(),
          StrikethroughFeature(),
          AlignFeature(),
          UnorderedListFeature(),
          OrderedListFeature(),
          BlockquoteFeature(),
          InlineToolbarFeature(),
          FixedToolbarFeature(),
          HorizontalRuleFeature(),
          UploadFeature(),
        ],
      }),
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
    ...slugField(),
  ],
  hooks: {
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
    maxPerDoc: 50,
  },
};
