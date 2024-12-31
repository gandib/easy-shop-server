import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { productServices } from "./product.service";
import pick from "../../../utils/pick";
import { productFilterAbleFields } from "./product.constant";
import { JwtPayload } from "jsonwebtoken";
import { TUser } from "../../interfaces/pagination";
import { TImageFiles } from "./product.interface";

const createProduct = catchAsync(async (req, res) => {
  const result = await productServices.createProduct(
    req.files as TImageFiles,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is created successfully!",
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const filters = pick(req.query, productFilterAbleFields);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

  const result = await productServices.getAllProducts(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products are retrieved successfully!",
    data: result,
  });
});

const getAllProductsByFollowedUser = catchAsync(async (req, res) => {
  const filters = pick(req.query, productFilterAbleFields);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

  const result = await productServices.getAllProductsByFollowedUser(
    filters,
    options,
    req.user as JwtPayload & TUser
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products are retrieved successfully!",
    data: result,
  });
});

const getAllProductsByShopId = catchAsync(async (req, res) => {
  const filters = pick(req.query, productFilterAbleFields);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

  const result = await productServices.getAllProductsByShopId(
    filters,
    options,
    req.user as JwtPayload & TUser
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products are retrieved successfully!",
    data: result,
  });
});

const getProductById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await productServices.getProductById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is retrieved successfully!",
    data: result,
  });
});

const updateProductById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await productServices.updateProductById(
    id,
    req.body,
    req.user as JwtPayload & TUser
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is updated successfully!",
    data: result,
  });
});

const deleteProductById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await productServices.deleteProductById(
    id,
    req.user as JwtPayload & TUser
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is deleted successfully!",
    data: result,
  });
});

export const productControllers = {
  createProduct,
  getAllProducts,
  getAllProductsByShopId,
  getProductById,
  updateProductById,
  deleteProductById,
  getAllProductsByFollowedUser,
};
