import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { ratingServices } from "./rating.service";
import { JwtPayload } from "jsonwebtoken";
import { TUser } from "../../interfaces/pagination";

const createRating = catchAsync(async (req, res) => {
  const result = await ratingServices.createRating(
    req.body,
    req.user as JwtPayload & TUser
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rating is created successfully!",
    data: result,
  });
});

const getAllRatings = catchAsync(async (req, res) => {
  const result = await ratingServices.getAllRatings(
    req.user as JwtPayload & TUser
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Ratings are retrieved successfully!",
    data: result,
  });
});

const getRatingById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ratingServices.getRatingById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rating is retrieved successfully!",
    data: result,
  });
});

const updateRatingById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ratingServices.updateRatingById(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rating is updated successfully!",
    data: result,
  });
});

export const ratingControllers = {
  createRating,
  getAllRatings,
  getRatingById,
  updateRatingById,
};
