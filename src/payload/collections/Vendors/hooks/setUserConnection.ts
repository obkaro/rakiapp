import type { CollectionAfterChangeHook } from "payload";

export const setUserConnection: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
  collection,
}) => {
  if (operation === "create") {
    doc.user = req?.user?.id;
    return doc;
  }
};
