import { User } from "@prisma/client";

const createUser = async (payload: User) => {
  console.log(payload);
};

export const userServices = {
  createUser,
};
