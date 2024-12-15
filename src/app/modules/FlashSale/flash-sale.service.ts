import { FlashSale } from "@prisma/client";
import prisma from "../../../utils/prisma";
import { TUser } from "../../interfaces/pagination";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createFlashSale = async (payload: FlashSale, user: TUser) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: user?.email,
    },
    include: {
      shop: true,
    },
  });

  const productData = await prisma.product.findUnique({
    where: {
      id: payload?.productId,
    },
  });

  if (userData?.shop?.id !== productData?.shopId) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "You are not authorised to create flash sale for another shop's product!"
    );
  }

  const result = await prisma.flashSale.create({
    data: payload,
    include: {
      product: true,
    },
  });

  return result;
};

const getAllFlashSales = async (user: TUser) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: user?.id,
    },
    include: {
      shop: {
        include: {
          product: true,
        },
      },
    },
  });

  const productIds = userData?.shop?.product?.map((prod) => prod.id);

  const result = await prisma.flashSale.findMany({
    where: {
      productId: { in: productIds },
    },
    include: {
      product: true,
    },
  });

  return result;
};

const getFlashSaleById = async (id: string) => {
  const result = await prisma.flashSale.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      product: true,
    },
  });
  return result;
};

const updateFlashSaleById = async (id: string, payload: Partial<FlashSale>) => {
  const FlashSale = await prisma.flashSale.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.flashSale.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const flashSaleServices = {
  createFlashSale,
  getAllFlashSales,
  getFlashSaleById,
  updateFlashSaleById,
};
