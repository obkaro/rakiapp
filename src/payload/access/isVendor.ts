import { Access } from "payload";

export const isVendor: Access = ({ req: { user } }) => {
  return user?.isVendor ?? false;
};
