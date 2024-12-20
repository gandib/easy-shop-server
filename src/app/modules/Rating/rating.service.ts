import { Prisma, Rating } from "@prisma/client";
import prisma from "../../../utils/prisma";
import { TUser } from "../../interfaces/pagination";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createRating = async (payload: Rating, user: TUser) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: user?.email,
    },
    include: {
      rating: true,
    },
  });

  const prodcutData = await prisma.product.findUnique({
    where: {
      id: payload.productId,
    },
    include: {
      shop: true,
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

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  if (orderData[0]?.orderItem[0]?.productId !== payload.productId) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Rating not possible before purchase!"
    );
  }

  payload.userId = userData?.id!;
  payload.shopId = prodcutData?.shopId!;

  let result;

  if (userData?.rating?.find((rate) => rate?.productId === payload.productId)) {
    const rating = await prisma.rating.findUnique({
      where: {
        id: userData?.rating?.filter(
          (rate) => rate?.productId === payload.productId
        )[0].id,
      },
    });

    result = await prisma.rating.update({
      where: {
        id: rating?.id,
      },
      data: {
        rating: payload.rating,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
          },
        },
        product: true,
      },
    });
  } else {
    result = await prisma.rating.create({
      data: payload,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
          },
        },
        product: true,
      },
    });
  }

  return result;
};

const getAllRatings = async (user: TUser) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
    },
    include: {
      shop: true,
    },
  });

  const andConditions: Prisma.RatingWhereInput[] = [];

  if (user?.role === "VENDOR") {
    andConditions.push({
      shopId: userData?.shop?.id,
    });
  }

  const whereConditions: Prisma.RatingWhereInput = { AND: andConditions };

  const result = await prisma.rating.findMany({
    where: whereConditions,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
        },
      },
      product: true,
    },
  });
  return result;
};

const getRatingById = async (id: string) => {
  const result = await prisma.rating.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
        },
      },
      product: true,
    },
  });
  return result;
};

const updateRatingById = async (id: string, payload: Partial<Rating>) => {
  const Rating = await prisma.rating.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.rating.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const ratingServices = {
  createRating,
  getAllRatings,
  getRatingById,
  updateRatingById,
};
