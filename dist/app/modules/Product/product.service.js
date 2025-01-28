"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productServices = void 0;
const prisma_1 = __importDefault(require("../../../utils/prisma"));
const sendImageToCloudinary_1 = require("../../../utils/sendImageToCloudinary");
const paginationHelpers_1 = require("../../../helper/paginationHelpers");
const product_constant_1 = require("./product.constant");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const createProduct = (files, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { file } = files;
    try {
        if (file) {
            const paths = [];
            const imageUrl = [];
            file.map((image) => {
                paths.push(image === null || image === void 0 ? void 0 : image.path);
            });
            // send image to cloudinary
            for (let index = 0; index < paths.length; index++) {
                const imageName = `${payload === null || payload === void 0 ? void 0 : payload.name}-${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                const path = paths[index];
                const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
                imageUrl.push(secure_url);
            }
            payload.img = imageUrl;
        }
    }
    catch (error) {
        console.log(error);
    }
    if (payload.img.length === 0) {
        payload.img = [config_1.default.project_photo];
    }
    const result = yield prisma_1.default.product.create({
        data: payload,
    });
    return result;
});
const getAllProducts = (query, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, category, shop, price, flash } = query, fieldsData = __rest(query, ["searchTerm", "category", "shop", "price", "flash"]);
    const { limit, page, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(options);
    const andConditions = [];
    const flashSaleData = yield prisma_1.default.flashSale.findMany();
    if (searchTerm) {
        andConditions.push({
            OR: product_constant_1.productSearchAbleFields.map((field) => ({
                [field]: {
                    contains: query === null || query === void 0 ? void 0 : query.searchTerm,
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
        const productIds = flashSaleData === null || flashSaleData === void 0 ? void 0 : flashSaleData.filter((flashSale) => flashSale.productId).map((flashSale) => flashSale.productId);
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
                    equals: fieldsData[key],
                },
            })),
        });
    }
    andConditions.push({
        isDeleted: false,
    });
    const whereConditions = { AND: andConditions };
    const result = yield prisma_1.default.product.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
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
    const total = yield prisma_1.default.product.count({
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
});
const getAllProductsByFollowedUser = (query, options, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { searchTerm, category, shop, price } = query, fieldsData = __rest(query, ["searchTerm", "category", "shop", "price"]);
    const { limit, page, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(options);
    const andConditions = [];
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: user === null || user === void 0 ? void 0 : user.id,
        },
        include: {
            follow: true,
        },
    });
    if (searchTerm) {
        andConditions.push({
            OR: product_constant_1.productSearchAbleFields.map((field) => ({
                [field]: {
                    contains: query === null || query === void 0 ? void 0 : query.searchTerm,
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
                    equals: fieldsData[key],
                },
            })),
        });
    }
    andConditions.push({
        shopId: (_b = (_a = userData === null || userData === void 0 ? void 0 : userData.follow) === null || _a === void 0 ? void 0 : _a.find((follow) => follow === null || follow === void 0 ? void 0 : follow.shopId)) === null || _b === void 0 ? void 0 : _b.shopId,
        isDeleted: false,
    });
    const whereConditions = { AND: andConditions };
    const result = yield prisma_1.default.product.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
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
    const total = yield prisma_1.default.product.count({
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
});
const getAllProductsByShopId = (query, options, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { searchTerm, category, shop, price } = query, fieldsData = __rest(query, ["searchTerm", "category", "shop", "price"]);
    const { limit, page, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(options);
    const andConditions = [];
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: user === null || user === void 0 ? void 0 : user.id,
        },
        include: {
            shop: true,
        },
    });
    if (searchTerm) {
        andConditions.push({
            OR: product_constant_1.productSearchAbleFields.map((field) => ({
                [field]: {
                    contains: query === null || query === void 0 ? void 0 : query.searchTerm,
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
                    equals: fieldsData[key],
                },
            })),
        });
    }
    let result;
    if (((_a = userData === null || userData === void 0 ? void 0 : userData.shop) === null || _a === void 0 ? void 0 : _a.id) === undefined) {
        return (result = []);
    }
    andConditions.push({
        shopId: (_b = userData === null || userData === void 0 ? void 0 : userData.shop) === null || _b === void 0 ? void 0 : _b.id,
        isDeleted: false,
    });
    const whereConditions = { AND: andConditions };
    result = yield prisma_1.default.product.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
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
    const total = yield prisma_1.default.product.count({
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
});
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.product.findUniqueOrThrow({
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
});
const updateProductById = (id, payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const productData = yield prisma_1.default.product.findUniqueOrThrow({
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
    const userData = yield prisma_1.default.user.findUnique({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
    });
    if ((user === null || user === void 0 ? void 0 : user.role) !== "ADMIN" &&
        (userData === null || userData === void 0 ? void 0 : userData.id) !== ((_b = (_a = productData === null || productData === void 0 ? void 0 : productData.shop) === null || _a === void 0 ? void 0 : _a.vendor) === null || _b === void 0 ? void 0 : _b.id)) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorised to update product data!");
    }
    const result = yield prisma_1.default.product.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteProductById = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const productData = yield prisma_1.default.product.findUniqueOrThrow({
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
    const userData = yield prisma_1.default.user.findUnique({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
    });
    if ((user === null || user === void 0 ? void 0 : user.role) !== "ADMIN" &&
        (userData === null || userData === void 0 ? void 0 : userData.id) !== ((_b = (_a = productData === null || productData === void 0 ? void 0 : productData.shop) === null || _a === void 0 ? void 0 : _a.vendor) === null || _b === void 0 ? void 0 : _b.id)) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorised to update product data!");
    }
    const result = yield prisma_1.default.product.update({
        where: {
            id,
        },
        data: {
            isDeleted: true,
        },
    });
    return result;
});
exports.productServices = {
    createProduct,
    getAllProducts,
    getProductById,
    getAllProductsByShopId,
    updateProductById,
    deleteProductById,
    getAllProductsByFollowedUser,
};
