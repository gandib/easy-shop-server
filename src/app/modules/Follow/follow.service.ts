import { Follow } from "@prisma/client";
import prisma from "../../../utils/prisma";
import { TUser } from "../../interfaces/pagination";

const createFollow = async (payload: Follow, user: TUser) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: user?.email,
      status: "ACTIVE",
    },
  });

  payload.userId = userData?.id!;

  const result = await prisma.follow.create({
    data: payload,
  });

  return result;
};

const getAllFollows = async () => {
  const result = await prisma.follow.findMany({
    include: {
      shop: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
        },
      },
    },
  });
  return result;
};

const getFollowByUser = async (user: TUser) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: user?.email,
      status: "ACTIVE",
    },
    include: {
      follow: true,
    },
  });

  const shopId = userData!.follow.filter(
    (user) => user.userId === userData!.id
  )[0].shopId;

  const result = await prisma.follow.findUniqueOrThrow({
    where: {
      userId_shopId: {
        userId: userData?.id!,
        shopId,
      },
    },
    include: {
      shop: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
        },
      },
    },
  });
  return result;
};

const unFollowByUser = async (user: TUser, payload: Partial<Follow>) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: user?.email,
      status: "ACTIVE",
    },
    include: {
      follow: true,
    },
  });

  const follow = await prisma.follow.findUniqueOrThrow({
    where: {
      userId_shopId: {
        userId: userData?.id!,
        shopId: payload.shopId!,
      },
    },
  });

  const result = await prisma.follow.delete({
    where: {
      userId_shopId: {
        userId: userData?.id!,
        shopId: payload.shopId!,
      },
    },
  });
  return result;
};

export const followServices = {
  createFollow,
  getAllFollows,
  getFollowByUser,
  unFollowByUser,
};
