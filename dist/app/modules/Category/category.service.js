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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryServices = void 0;
const prisma_1 = __importDefault(require("../../../utils/prisma"));
const sendImageToCloudinary_1 = require("../../../utils/sendImageToCloudinary");
const createCategory = (file, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (file) {
        const imageName = `${payload === null || payload === void 0 ? void 0 : payload.name}-${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const path = file === null || file === void 0 ? void 0 : file.path;
        // send image to cloudinary
        const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
        payload.img = secure_url;
    }
    const result = yield prisma_1.default.category.create({
        data: payload,
    });
    return result;
});
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.category.findMany({
        where: {
            isDeleted: false,
        },
        include: {
            product: true,
        },
    });
    return result;
});
const getCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.category.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false,
        },
        include: {
            product: true,
        },
    });
    return result;
});
const updateCategoryById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield prisma_1.default.category.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false,
        },
    });
    const result = yield prisma_1.default.category.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
exports.categoryServices = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
};
