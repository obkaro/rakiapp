import { Access } from "payload";

export const adminOrSelf: Access = ({ req: { user } }) => {
  if (user?.isAdmin) {
    return true;
  }

  return {
    id: {
      equals: user?.id,
    },
  };
};
