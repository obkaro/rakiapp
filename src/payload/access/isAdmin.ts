import { Access } from "payload";

export const isAdmin: Access = ({ req: { user } }) => {
  return user?.isAdmin ?? false;
};
