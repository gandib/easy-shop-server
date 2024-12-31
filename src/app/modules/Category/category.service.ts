import { Category } from "@prisma/client";
import prisma from "../../../utils/prisma";
import { sendImageToCloudinary } from "../../../utils/sendImageToCloudinary";

const createCategory = async (file: any, payload: Category) => {
  if (file) {
    const imageName = `${payload?.name}-${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}`;
    const path = file?.path;

    // send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    payload.img = secure_url as string;
  }

  const result = await prisma.category.create({
    data: payload,
  });

  return result;
};

const getAllCategories = async () => {
  const result = await prisma.category.findMany({
    where: {
      isDeleted: false,
    },
    include: {
      product: true,
    },
  });
  return result;
};

const getCategoryById = async (id: string) => {
  const result = await prisma.category.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      product: true,
    },
  });
  return result;
};

const updateCategoryById = async (id: string, payload: Partial<Category>) => {
  const category = await prisma.category.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const categoryServices = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
};
