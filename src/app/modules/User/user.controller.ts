import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { userServices } from "./user.service";

const createUser = catchAsync(async (req, res) => {
  const result = await userServices.createUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully!",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await userServices.getAllUsers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully!",
    data: result,
  });
});

const getUserByEmail = catchAsync(async (req, res) => {
  const result = await userServices.getUserByEmail(req.user.email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully!",
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const result = await userServices.updateUser(req.user.email, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully!",
    data: result,
  });
});

const statusChange = catchAsync(async (req, res) => {
  const result = await userServices.statusChange(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User status changed successfully!",
    data: result,
  });
});

export const userControllers = {
  createUser,
  getAllUsers,
  getUserByEmail,
  updateUser,
  statusChange,
};
