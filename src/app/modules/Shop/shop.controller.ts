import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { shopServices } from "./shop.service";
import { JwtPayload } from "jsonwebtoken";
import { UserRole } from "@prisma/client";

const createshop = catchAsync(async (req, res) => {
  const result = await shopServices.createShop(req.file, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Shop is created successfully!",
    data: result,
  });
});

const getAllShops = catchAsync(async (req, res) => {
  const result = await shopServices.getAllShops();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Shops are retrieved successfully!",
    data: result,
  });
});

const getShopById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await shopServices.getShopById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Shop is retrieved successfully!",
    data: result,
  });
});

const updateShopById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await shopServices.updateShopById(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Shop is updated successfully!",
    data: result,
  });
});

const updateBlackListShopById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await shopServices.updateBlackListShopById(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Shop's black list status is updated successfully!",
    data: result,
  });
});

export const shopControllers = {
  createshop,
  getAllShops,
  getShopById,
  updateShopById,
  updateBlackListShopById,
};
