"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.default = {
    node_dev: process.env.NODE_ENV,
    database_url: process.env.DATABASE_URL,
    port: process.env.PORT,
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    jwt: {
        jwt_secret: process.env.JWT_SECRET,
        jwt_expires_in: process.env.JWT_EXPIRES_IN,
        jwt_refresh_token_secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
        jwt_reset_password_secret: process.env.JWT_RESET_PASSWORD_SECRET,
        jwt_reset_password_expires_in: process.env.JWT_RESET_PASSWORD_EXPIRES_IN,
    },
    reset_password_link: process.env.RESET_PASSWORD_LINK,
    sendEmail: {
        email: process.env.EMAIL,
        app_pass: process.env.APP_PASS,
    },
    clodinary: {
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
    },
    store_id: process.env.STORE_ID,
    signature_key: process.env.SIGNATURE_KEY,
    payment_url: process.env.PAYMENT_URL,
    verify_payment_url: process.env.PAYMENT_VERIFY_URL,
};
