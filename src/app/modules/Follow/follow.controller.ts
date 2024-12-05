import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { followServices } from "./follow.service";
import { JwtPayload } from "jsonwebtoken";
import { TUser } from "../../interfaces/pagination";

const createFollow = catchAsync(async (req, res) => {
  const result = await followServices.createFollow(
    req.body,
    req.user as JwtPayload & TUser
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Follow is created successfully!",
    data: result,
  });
});

const getAllFollows = catchAsync(async (req, res) => {
  const result = await followServices.getAllFollows();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Follows are retrieved successfully!",
    data: result,
  });
});

const getFollowByUser = catchAsync(async (req, res) => {
  const result = await followServices.getFollowByUser(
    req.user as JwtPayload & TUser
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Follow is retrieved successfully!",
    data: result,
  });
});

const unFollowByUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await followServices.unFollowByUser(
    req.user as JwtPayload & TUser,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Unfollow is updated successfully!",
    data: result,
  });
});

export const followControllers = {
  createFollow,
  getAllFollows,
  getFollowByUser,
  unFollowByUser,
};
