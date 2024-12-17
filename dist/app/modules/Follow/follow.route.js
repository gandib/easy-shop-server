"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followRoutes = void 0;
const express_1 = __importDefault(require("express"));
const follow_controller_1 = require("./follow.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const follow_validation_1 = require("./follow.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get("/", follow_controller_1.followControllers.getAllFollows);
router.get("/single-follow", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR, client_1.UserRole.USER), follow_controller_1.followControllers.getFollowByUser);
router.post("/", (0, auth_1.default)(client_1.UserRole.USER), (0, validateRequest_1.default)(follow_validation_1.followValidations.createFollowSchema), follow_controller_1.followControllers.createFollow);
router.patch("/", (0, auth_1.default)(client_1.UserRole.USER), (0, validateRequest_1.default)(follow_validation_1.followValidations.createFollowSchema), follow_controller_1.followControllers.unFollowByUser);
exports.followRoutes = router;
