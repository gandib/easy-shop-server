import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.code === "P2002") {
    const target = error.meta.target[0];
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: `Already exists!`,
      error,
    });
  }
  if (error.code === "P2025") {
    const target = error.meta.modelName;
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: `Not found!`,
      error,
    });
  }
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: error?.message || "Something went wrong!",
    error,
  });
};

export default globalErrorHandler;
