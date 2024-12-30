import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";
import { TUser } from "../../interfaces/pagination";
import { newsletterServices } from "./newsletter.service";

const createNewsletter = catchAsync(async (req, res) => {
  const result = await newsletterServices.createNewsletter(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Subscribed successfully!",
    data: result,
  });
});

const getAllNewsletters = catchAsync(async (req, res) => {
  const result = await newsletterServices.getAllNewsletters();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Subscribers are retrieved successfully!",
    data: result,
  });
});

const deleteNewsletterByEmail = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result = await newsletterServices.deleteNewsletterByEmail(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Subscriber is deleted successfully!",
    data: result,
  });
});

export const newsletterControllers = {
  createNewsletter,
  getAllNewsletters,
  deleteNewsletterByEmail,
};
