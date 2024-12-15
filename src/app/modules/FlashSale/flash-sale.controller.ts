import { TUser } from "./../../interfaces/pagination";
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { flashSaleServices } from "./flash-sale.service";
import { JwtPayload } from "jsonwebtoken";

const createFlashSale = catchAsync(async (req, res) => {
  const result = await flashSaleServices.createFlashSale(
    req.body,
    req.user as JwtPayload & TUser
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "FlashSale is created successfully!",
    data: result,
  });
});

const getAllFlashSales = catchAsync(async (req, res) => {
  const result = await flashSaleServices.getAllFlashSales(
    req.user as JwtPayload & TUser
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "FlashSales are retrieved successfully!",
    data: result,
  });
});

const getFlashSaleById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await flashSaleServices.getFlashSaleById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "FlashSale is retrieved successfully!",
    data: result,
  });
});

const updateFlashSaleById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await flashSaleServices.updateFlashSaleById(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "FlashSale is updated successfully!",
    data: result,
  });
});

export const flashSaleControllers = {
  createFlashSale,
  getAllFlashSales,
  getFlashSaleById,
  updateFlashSaleById,
};
