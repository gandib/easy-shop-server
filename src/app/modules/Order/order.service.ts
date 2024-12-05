import { Order, OrderItem } from "@prisma/client";
import prisma from "../../../utils/prisma";
import { TUser } from "../../interfaces/pagination";

const createOrder = async (
  payload: Order & { orderItems: OrderItem[] },
  user: TUser
) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: user?.email,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    const createOrder = await transactionClient.order.create({
      data: {
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

const getAllOrders = async () => {
  const result = await prisma.order.findMany({
    include: {
      orderItem: true,
      payment: true,
    },
  });
  return result;
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
