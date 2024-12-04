import { ShopResponse } from "@prisma/client";
import prisma from "../../../utils/prisma";
import { TUser } from "../../interfaces/pagination";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createShopResponse = async (payload: ShopResponse, user: TUser) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: user?.email,
    },
    include: {
      shop: true,
    },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  const reviewData = await prisma.review.findUnique({
    where: {
      id: payload?.reviewId,
    },
    include: {
      product: true,
    },
  });

  if (reviewData?.product?.shopId !== userData?.shop?.id) {
    throw new AppError(httpStatus.NOT_FOUND, "Review not found!");
  }

  payload.shopId = userData?.shop?.id!;

  const result = await prisma.shopResponse.create({
    data: payload,
    include: {
      review: true,
      shop: true,
    },
  });

  return result;
};

const getAllShopResponses = async () => {
  const result = await prisma.shopResponse.findMany({
    include: {
      review: true,
      shop: true,
    },
  });
  return result;
};

const getShopResponseById = async (id: string) => {
  const result = await prisma.shopResponse.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      review: true,
      shop: true,
    },
  });
  return result;
};

const updateShopResponseById = async (
  id: string,
  payload: Partial<ShopResponse>
) => {
  const ShopResponse = await prisma.shopResponse.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.shopResponse.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const shopResponseServices = {
  createShopResponse,
  getAllShopResponses,
  getShopResponseById,
  updateShopResponseById,
};
