import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { shopResponseServices } from "./shop-response.service";
import { JwtPayload } from "jsonwebtoken";
import { TUser } from "../../interfaces/pagination";

const createShopResponse = catchAsync(async (req, res) => {
  const result = await shopResponseServices.createShopResponse(
    req.body,
    req.user as JwtPayload & TUser
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Shop response is created successfully!",
    data: result,
  });
});

const getAllShopResponses = catchAsync(async (req, res) => {
  const result = await shopResponseServices.getAllShopResponses();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Shop responses are retrieved successfully!",
    data: result,
  });
});

const getShopResponseById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await shopResponseServices.getShopResponseById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Shop response is retrieved successfully!",
    data: result,
  });
});

const updateShopResponseById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await shopResponseServices.updateShopResponseById(
    id,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Shop response is updated successfully!",
    data: result,
  });
});

export const shopResponseControllers = {
  createShopResponse,
  getAllShopResponses,
  getShopResponseById,
  updateShopResponseById,
};
