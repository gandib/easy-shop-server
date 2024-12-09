import { Order, OrderItem, Prisma } from "@prisma/client";
import prisma from "../../../utils/prisma";
import { TPaginationOptions, TUser } from "../../interfaces/pagination";
import { paginationHelpers } from "../../../helper/paginationHelpers";

const createOrder = async (
  payload: Order & { orderItems: OrderItem[] },
  user: TUser
) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: user?.email,
    },
  });

  const productData = await prisma.product.findUniqueOrThrow({
    where: {
      id: payload.orderItems[0].productId,
    },
    include: {
      shop: true,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    const createOrder = await transactionClient.order.create({
      data: {
        shopId: productData?.shopId,
        userId: userData?.id!,
        totalPrice: payload.totalPrice,
      },
      include: {
        orderItem: true,
      },
    });

    for (let index = 0; index < payload.orderItems.length; index++) {
      const orderItem = payload.orderItems[index];
      const createOrderItem = await transactionClient.orderItem.create({
        data: {
          orderId: createOrder.id,
          productId: orderItem.productId,
          quantity: orderItem.quantity,
        },
      });

      const productData = await transactionClient.product.findUniqueOrThrow({
        where: {
          id: orderItem.productId,
        },
      });

      const decreaseProductQuantity = await transactionClient.product.update({
        where: {
          id: orderItem.productId,
        },
        data: {
          quantity: productData?.quantity - orderItem.quantity,
        },
      });
    }

    return createOrder;
  });

  return result;
};

const getAllOrders = async (options: TPaginationOptions, user: TUser) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
    },
    include: {
      shop: true,
    },
  });

  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const andConditions: Prisma.OrderWhereInput[] = [];

  if (user.role === "VENDOR") {
    andConditions.push({
      shopId: userData?.shop?.id,
    });
  }

  if (user.role === "USER") {
    andConditions.push({
      userId: userData?.id,
    });
  }

  const whereConditions: Prisma.OrderWhereInput = { AND: andConditions };

  const result = await prisma.order.findMany({
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
    include: {
      orderItem: true,
      payment: true,
    },
  });

  const total = await prisma.order.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getOrderById = async (id: string) => {
  const result = await prisma.order.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      orderItem: true,
      payment: true,
    },
  });
  return result;
};

const updateOrderById = async (id: string, payload: Partial<Order>) => {
  const Order = await prisma.order.findUniqueOrThrow({
    where: {
      id,
      paymentStatus: "UNPAID",
    },
  });

  const result = await prisma.order.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const orderServices = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
};
