import { Shop, UserRole } from "@prisma/client";
import prisma from "../../../utils/prisma";
import { sendImageToCloudinary } from "../../../utils/sendImageToCloudinary";

const createShop = async (file: any, payload: Shop) => {
  if (file) {
    const imageName = `${payload?.name}-${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}`;
    const path = file?.path;

    // send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    payload.logo = secure_url as string;
  }

  const result = await prisma.shop.create({
    data: payload,
  });

  return result;
};

const getAllShops = async () => {
  const result = await prisma.shop.findMany({
    where: {
      // isBlackListed: false,
    },
    include: {
      vendor: true,
      product: true,
      shopResponse: true,
      follow: true,
      coupon: true,
    },
  });
  return result;
};

const getShopById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      shop: true,
    },
  });

  const result = await prisma.shop.findUniqueOrThrow({
    where: {
      id: user?.shop?.id ? user?.shop?.id : id,
      isBlackListed: false,
    },
    include: {
      vendor: true,
      product: true,
      shopResponse: true,
      follow: true,
      coupon: true,
    },
  });
  return result;
};

const updateShopById = async (id: string, payload: Partial<Shop>) => {
  await prisma.shop.findUniqueOrThrow({
    where: {
      id,
      isBlackListed: false,
    },
  });

  const result = await prisma.shop.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const updateBlackListShopById = async (id: string, payload: Partial<Shop>) => {
  const result = await prisma.shop.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const shopServices = {
  createShop,
  getAllShops,
  getShopById,
  updateShopById,
  updateBlackListShopById,
};
