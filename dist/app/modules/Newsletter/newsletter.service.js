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
exports.newsletterServices = void 0;
const prisma_1 = __importDefault(require("../../../utils/prisma"));
const createNewsletter = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.newsletter.create({
        data: payload,
    });
    return result;
});
const getAllNewsletters = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.newsletter.findMany();
    return result;
});
const deleteNewsletterByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const subscriber = yield prisma_1.default.newsletter.findUniqueOrThrow({
        where: {
            email: email,
        },
    });
    const result = yield prisma_1.default.newsletter.delete({
        where: {
            email: email,
        },
    });
    return result;
});
exports.newsletterServices = {
    createNewsletter,
    getAllNewsletters,
    deleteNewsletterByEmail,
};
