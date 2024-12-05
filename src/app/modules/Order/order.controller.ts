import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { orderServices } from "./order.service";
import { JwtPayload } from "jsonwebtoken";
import { TUser } from "../../interfaces/pagination";

const createOrder = catchAsync(async (req, res) => {
  const result = await orderServices.createOrder(
    req.body,
    req.user as JwtPayload & TUser
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order is created successfully!",
    data: result,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const result = await orderServices.getAllOrders();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Orders are retrieved successfully!",
    data: result,
  });
});

const getOrderById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await orderServices.getOrderById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order is retrieved successfully!",
    data: result,
  });
});

const updateOrderById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await orderServices.updateOrderById(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order is updated successfully!",
    data: result,
  });
});

export const orderControllers = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
};
