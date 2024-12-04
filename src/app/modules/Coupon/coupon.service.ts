import { Coupon } from "@prisma/client";
import prisma from "../../../utils/prisma";
import { TUser } from "../../interfaces/pagination";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createCoupon = async (payload: Coupon, user: TUser) => {
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

  payload.shopId = userData?.shop?.id!;

  const result = await prisma.coupon.create({
    data: payload,
    include: {
      shop: true,
    },
  });

  return result;
};

const getAllCoupons = async () => {
  const result = await prisma.coupon.findMany({
    include: {
      shop: true,
    },
  });
  return result;
};

const getCouponById = async (id: string) => {
  const result = await prisma.coupon.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      shop: true,
    },
  });
  return result;
};

const updateCouponById = async (id: string, payload: Partial<Coupon>) => {
  const Coupon = await prisma.coupon.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.coupon.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const couponServices = {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCouponById,
};
