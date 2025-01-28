import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import AppError from "../errors/AppError";
import { Prisma } from "@prisma/client";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let success = false;
  let message = error?.message || "Something went wrong!";

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    statusCode = 403;
    message = "Validation Error!";
    error = error.message;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (
      error.code === "P2002" &&
      error.meta?.target &&
      Array.isArray(error.meta.target)
    ) {
      statusCode = httpStatus.BAD_REQUEST;
      const target = error.meta.target[0];
      message = `${
        target[0].toUpperCase() + target.substring(1)
      } is already exists!`;
      error = error.message;
    } else {
      message = "An unknown error occurred.";
    }

    if (error.code === "P2025") {
      statusCode = httpStatus.BAD_REQUEST;
      message = `Not found!`;
    }
  }

  // if (error.code === "P2002") {
  //   const target = error.meta.target[0];
  //   return res.status(httpStatus.BAD_REQUEST).json({
  //     success: false,
  //     message: `Already exists!`,
  //     error,
  //   });
  // }

  // if (error.code === "P2025") {
  //   const target = error.meta.modelName;
  //   return res.status(httpStatus.BAD_REQUEST).json({
  //     success: false,
  //     message: `Not found!`,
  //     error,
  //   });
  // }

  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success,
    message,
    error,
  });
};

export default globalErrorHandler;
