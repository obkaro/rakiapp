import { User } from "@/payload-types";
import type { CollectionBeforeChangeHook } from "payload";

export const updateDisplayName: CollectionBeforeChangeHook<User> = async ({
  data,
}) => {
  if (data.firstName && data.lastName) {
    data.displayName = `${data.firstName} ${data.lastName}`;
  }
  return data;
};
