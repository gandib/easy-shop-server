import { Review } from "@prisma/client";
import prisma from "../../../utils/prisma";
import { TUser } from "../../interfaces/pagination";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createReview = async (payload: Review, user: TUser) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: user?.email,
    },
  });

  const orderData = await prisma.order.findMany({
    where: {
      AND: [
        {
          userId: user?.id,
          paymentStatus: "PAID",
        },
        {
          orderItem: {
            some: {
              productId: payload.productId,
            },
          },
        },
      ],
    },
    include: {
      orderItem: true,
    },
  });

  if (orderData[0]?.orderItem[0]?.productId !== payload.productId) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Review not possible before purchase!"
    );
  }

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  payload.userId = userData?.id!;

  // if(orderData?.find(order=> order?.orderItem))

  const result = await prisma.review.create({
    data: payload,
    include: {
      product: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
        },
      },
      shopResponse: true,
    },
  });

  return result;
};

const getAllReviews = async () => {
  const result = await prisma.review.findMany({
    include: {
      product: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
        },
      },
      shopResponse: true,
    },
  });
  return result;
};

const getReviewById = async (id: string) => {
  const result = await prisma.review.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      product: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
        },
      },
      shopResponse: true,
    },
  });
  return result;
};

const updateReviewById = async (id: string, payload: Partial<Review>) => {
  const Review = await prisma.review.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.review.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const reviewServices = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReviewById,
};
