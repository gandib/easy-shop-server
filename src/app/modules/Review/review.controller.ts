import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { reviewServices } from "./review.service";
import { JwtPayload } from "jsonwebtoken";
import { TUser } from "../../interfaces/pagination";

const createReview = catchAsync(async (req, res) => {
  const result = await reviewServices.createReview(
    req.body,
    req.user as JwtPayload & TUser
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review is created successfully!",
    data: result,
  });
});

const getAllReviews = catchAsync(async (req, res) => {
  const result = await reviewServices.getAllReviews();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reviews are retrieved successfully!",
    data: result,
  });
});

const getReviewById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await reviewServices.getReviewById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review is retrieved successfully!",
    data: result,
  });
});

const updateReviewById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await reviewServices.updateReviewById(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review is updated successfully!",
    data: result,
  });
});

export const reviewControllers = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReviewById,
};
