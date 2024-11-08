import { Access } from "payload";

export const isTraveler: Access = ({ req: { user } }) => {
  return user?.isTraveler ?? false;
};
