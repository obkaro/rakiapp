import { Vendor } from "@/payload-types";
import type { CollectionBeforeChangeHook } from "payload";

export const setUserConnection: CollectionBeforeChangeHook<Vendor> = async ({
  data,
  operation,
  req,
  collection,
}) => {
  if (operation === "create" || operation === "update") {
    data.user = req?.user?.id;
    data.status = "pending";
  }
  return data;
};
