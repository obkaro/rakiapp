import { User } from "@/payload-types";
import type { CollectionAfterChangeHook } from "payload";

export const updateDisplayName: CollectionAfterChangeHook<User> = async ({
  doc,
}) => {
  if (doc.firstName && doc.lastName) {
    doc.displayName = `${doc.firstName} ${doc.lastName}`;
    return doc;
  }
};
