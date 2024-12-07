import { UserRole } from "@prisma/client";

export type TPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string | undefined;
  sortOrder?: string | undefined;
};

export type TUser = {
  id: string;
  email: string;
  role: UserRole;
};
