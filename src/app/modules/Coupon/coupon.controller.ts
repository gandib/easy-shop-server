import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { couponServices } from "./coupon.service";
import { JwtPayload } from "jsonwebtoken";
import { TUser } from "../../interfaces/pagination";

const createCoupon = catchAsync(async (req, res) => {
  const result = await couponServices.createCoupon(
    req.body,
    req.user as JwtPayload & TUser
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Coupon is created successfully!",
    data: result,
  });
});

const getAllCoupons = catchAsync(async (req, res) => {
  const result = await couponServices.getAllCoupons(
    req.user as JwtPayload & TUser
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Coupons are retrieved successfully!",
    data: result,
  });
});

const getCouponById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await couponServices.getCouponById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Coupon is retrieved successfully!",
    data: result,
  });
});

const updateCouponById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await couponServices.updateCouponById(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Coupon is updated successfully!",
    data: result,
  });
});

export const couponControllers = {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCouponById,
};
