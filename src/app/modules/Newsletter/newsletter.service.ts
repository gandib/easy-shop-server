import { Newsletter, Prisma, Rating } from "@prisma/client";
import prisma from "../../../utils/prisma";

const createNewsletter = async (payload: Newsletter) => {
  const result = await prisma.newsletter.create({
    data: payload,
  });

  return result;
};

const getAllNewsletters = async () => {
  const result = await prisma.newsletter.findMany();
  return result;
};

const deleteNewsletterByEmail = async (email: string) => {
  const subscriber = await prisma.newsletter.findUniqueOrThrow({
    where: {
      email: email,
    },
  });

  const result = await prisma.newsletter.delete({
    where: {
      email: email,
    },
  });
  return result;
};

export const newsletterServices = {
  createNewsletter,
  getAllNewsletters,
  deleteNewsletterByEmail,
};
