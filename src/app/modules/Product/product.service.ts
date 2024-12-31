import { Prisma, Product, UserRole } from "@prisma/client";
import prisma from "../../../utils/prisma";
import { sendImageToCloudinary } from "../../../utils/sendImageToCloudinary";
import { TPaginationOptions, TUser } from "../../interfaces/pagination";
import { TImageFiles, TProductFilterRequest } from "./product.interface";
import { paginationHelpers } from "../../../helper/paginationHelpers";
import { productSearchAbleFields } from "./product.constant";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import config from "../../../config";

const createProduct = async (files: TImageFiles, payload: Product) => {
  const { file } = files;
  try {
    if (file) {
      const paths: string[] = [];
      const imageUrl: string[] = [];
      file.map((image: any) => {
        paths.push(image?.path);
      });

      // send image to cloudinary
      for (let index = 0; index < paths.length; index++) {
        const imageName = `${payload?.name}-${Date.now()}-${Math.round(
          Math.random() * 1e9
        )}`;
        const path = paths[index];
        const { secure_url } = await sendImageToCloudinary(imageName, path);
        imageUrl.push(secure_url as string);
      }
      payload.img = imageUrl as string[];
    }
  } catch (error) {
    console.log(error);
  }

  if (payload.img.length === 0) {
    payload.img = [config.project_photo!];
  }

  const result = await prisma.product.create({
    data: payload,
  });

  return result;
};

const getAllProducts = async (
  query: TProductFilterRequest,
  options: TPaginationOptions
) => {
  const { searchTerm, category, shop, price, flash, ...fieldsData } = query;
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const andConditions: Prisma.ProductWhereInput[] = [];

  const flashSaleData = await prisma.flashSale.findMany();

  if (searchTerm) {
    andConditions.push({
      OR: productSearchAbleFields.map((field) => ({
        [field]: {
          contains: query?.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (category) {
    andConditions.push({
      category: {
        name: {
          contains: category,
          mode: "insensitive",
        },
      },
    });
  }

  if (shop) {
    andConditions.push({
      shop: {
        id: shop,
      },
    });
  }

  if (price) {
    andConditions.push({
      price: {
        gte: Number(price.split("-")[0]),
        lte: Number(price.split("-")[1]),
      },
    });
  }

  if (flash) {
    const productIds = flashSaleData
      ?.filter((flashSale) => flashSale.productId)
      .map((flashSale) => flashSale.productId);

    if (productIds && productIds.length > 0) {
      andConditions.push({
        flashSale: {
          some: {
            productId: {
              in: productIds,
            },
          },
        },
      });
    }
  }

  if (Object.keys(fieldsData).length > 0) {
    andConditions.push({
      AND: Object.keys(fieldsData).map((key) => ({
        [key]: {
          equals: (fieldsData as any)[key],
        },
      })),
    });
  }

  andConditions.push({
    isDeleted: false,
  });

  const whereConditions: Prisma.ProductWhereInput = { AND: andConditions };

  const result = await prisma.product.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
    include: {
      category: true,
      orderItem: true,
      rating: true,
      review: true,
      shop: {
        include: {
          vendor: true,
        },
      },
      flashSale: {
        include: {
          product: true,
        },
      },
    },
  });

  const total = await prisma.product.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: result,
  };
};

const getAllProductsByFollowedUser = async (
  query: TProductFilterRequest,
  options: TPaginationOptions,
  user: TUser
) => {
  const { searchTerm, category, shop, price, ...fieldsData } = query;
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const andConditions: Prisma.ProductWhereInput[] = [];

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: user?.id,
    },
    include: {
      follow: true,
    },
  });

  if (searchTerm) {
    andConditions.push({
      OR: productSearchAbleFields.map((field) => ({
        [field]: {
          contains: query?.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (category) {
    andConditions.push({
      category: {
        name: {
          contains: category,
          mode: "insensitive",
        },
      },
    });
  }
  if (shop) {
    andConditions.push({
      shop: {
        id: shop,
      },
    });
  }
  if (price) {
    andConditions.push({
      price: {
        gte: Number(price.split("-")[0]),
        lte: Number(price.split("-")[1]),
      },
    });
  }

  if (Object.keys(fieldsData).length > 0) {
    andConditions.push({
      AND: Object.keys(fieldsData).map((key) => ({
        [key]: {
          equals: (fieldsData as any)[key],
        },
      })),
    });
  }

  andConditions.push({
    shopId: userData?.follow?.find((follow) => follow?.shopId)?.shopId,
    isDeleted: false,
  });

  const whereConditions: Prisma.ProductWhereInput = { AND: andConditions };

  const result = await prisma.product.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
    include: {
      category: true,
      orderItem: true,
      rating: true,
      review: true,
      shop: {
        include: {
          vendor: true,
        },
      },
      flashSale: {
        include: {
          product: true,
        },
      },
    },
  });

  const total = await prisma.product.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: result,
  };
};

const getAllProductsByShopId = async (
  query: TProductFilterRequest,
  options: TPaginationOptions,
  user: TUser
) => {
  const { searchTerm, category, shop, price, ...fieldsData } = query;
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const andConditions: Prisma.ProductWhereInput[] = [];

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: user?.id,
    },
    include: {
      shop: true,
    },
  });

  if (searchTerm) {
    andConditions.push({
      OR: productSearchAbleFields.map((field) => ({
        [field]: {
          contains: query?.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (category) {
    andConditions.push({
      category: {
        name: {
          contains: category,
          mode: "insensitive",
        },
      },
    });
  }
  if (shop) {
    andConditions.push({
      shop: {
        name: {
          contains: shop,
          mode: "insensitive",
        },
      },
    });
  }
  if (price) {
    andConditions.push({
      price: {
        lte: Number(price),
      },
    });
  }

  if (Object.keys(fieldsData).length > 0) {
    andConditions.push({
      AND: Object.keys(fieldsData).map((key) => ({
        [key]: {
          equals: (fieldsData as any)[key],
        },
      })),
    });
  }

  let result;

  if (userData?.shop?.id === undefined) {
    return (result = []);
  }

  andConditions.push({
    shopId: userData?.shop?.id,
    isDeleted: false,
  });

  const whereConditions: Prisma.ProductWhereInput = { AND: andConditions };

  result = await prisma.product.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
    include: {
      category: true,
      orderItem: true,
      rating: true,
      review: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              status: true,
            },
          },
          shopResponse: {
            include: {
              shop: true,
            },
          },
        },
      },
      shop: {
        include: {
          vendor: true,
        },
      },
      flashSale: {
        include: {
          product: true,
        },
      },
    },
  });

  const total = await prisma.product.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: result,
  };
};

const getProductById = async (id: string) => {
  const result = await prisma.product.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      category: true,
      orderItem: true,
      rating: true,
      review: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              status: true,
            },
          },
          shopResponse: {
            include: {
              shop: true,
            },
          },
        },
      },
      shop: {
        include: {
          vendor: true,
        },
      },
      flashSale: {
        include: {
          product: true,
        },
      },
    },
  });
  return result;
};

const updateProductById = async (
  id: string,
  payload: Partial<Product>,
  user: TUser
) => {
  const productData = await prisma.product.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      shop: {
        include: {
          vendor: true,
        },
      },
    },
  });

  const userData = await prisma.user.findUnique({
    where: {
      email: user?.email,
    },
  });

  if (
    user?.role !== "ADMIN" &&
    userData?.id !== productData?.shop?.vendor?.id
  ) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You are not authorised to update product data!"
    );
  }

  const result = await prisma.product.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteProductById = async (id: string, user: TUser) => {
  const productData = await prisma.product.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      shop: {
        include: {
          vendor: true,
        },
      },
    },
  });

  const userData = await prisma.user.findUnique({
    where: {
      email: user?.email,
    },
  });

  if (
    user?.role !== "ADMIN" &&
    userData?.id !== productData?.shop?.vendor?.id
  ) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You are not authorised to update product data!"
    );
  }

  const result = await prisma.product.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });
  return result;
};

export const productServices = {
  createProduct,
  getAllProducts,
  getProductById,
  getAllProductsByShopId,
  updateProductById,
  deleteProductById,
  getAllProductsByFollowedUser,
};
