"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler = (error, req, res, next) => {
    if (error.code === "P2002") {
        const target = error.meta.target[0];
        return res.status(http_status_1.default.BAD_REQUEST).json({
            success: false,
            message: `Already exists!`,
            error,
        });
    }
    if (error.code === "P2025") {
        const target = error.meta.modelName;
        return res.status(http_status_1.default.BAD_REQUEST).json({
            success: false,
            message: `Not found!`,
            error,
        });
    }
    res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: (error === null || error === void 0 ? void 0 : error.message) || "Something went wrong!",
        error,
    });
};
exports.default = globalErrorHandler;
