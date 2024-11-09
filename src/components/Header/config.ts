import type { GlobalConfig } from "payload";

import { link } from "@/payload/fields/link";
import { revalidateHeader } from "./hooks/revalidateHeader";

export const Header: GlobalConfig = {
  slug: "header",
  access: {
    read: () => true,
  },
  admin: {
    hidden: ({ user }) => {
      return user?.isAdmin ? false : true;
    },
  },
  fields: [
    {
      name: "navItems",
      type: "array",
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
};
