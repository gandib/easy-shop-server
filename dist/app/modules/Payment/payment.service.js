"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const axios_1 = __importDefault(require("axios"));
const path_1 = require("path");
const fs_1 = require("fs");
const payment_utils_1 = require("./payment.utils");
const config_1 = __importDefault(require("../../../config"));
const prisma_1 = __importDefault(require("../../../utils/prisma"));
const initiatePayment = (paymentData) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUniqueOrThrow({
      where: {
        id: paymentData.userId,
      },
    });
    const transactionId = `easy-shop-${Date.now()}`;
    try {
      const response = yield axios_1.default.post(
        config_1.default.payment_url,
        {
          store_id: config_1.default.store_id,
          signature_key: config_1.default.signature_key,
          tran_id: `${paymentData.orderId}-${transactionId}`,
          success_url: `https://easy-shop-server-puce.vercel.app/api/v1/payment/confirmation?transactionId=${paymentData.orderId}-${transactionId}&status=success`,
          fail_url: `https://easy-shop-server-puce.vercel.app/api/v1/payment/confirmation?transactionId=${paymentData.orderId}-${transactionId}&status=failed`,
          cancel_url: "https://easy-shop-client.vercel.app/",
          amount: paymentData.amount,
          currency: "BDT",
          desc: "Merchant Registration Payment",
          cus_name: user.name,
          cus_email: user.email,
          cus_add1: "N/A",
          cus_add2: "N/A",
          cus_city: "N/A",
          cus_state: "N/A",
          cus_postcode: "N/A",
          cus_country: "N/A",
          cus_phone: "N/A",
          type: "json",
        }
      );
      yield prisma_1.default.order.update({
        where: {
          id: paymentData.orderId,
        },
        data: {
          transactionId: `${paymentData.orderId}-${transactionId}`,
        },
      });
      return response.data;
    } catch (err) {
      throw new Error("Payment initiation failed!");
    }
  });
const paymentConfirmation = (transactionId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const verifyResponse = yield (0, payment_utils_1.verifyPayment)(
      transactionId
    );
    let message = "";
    const trnxId =
      transactionId === null || transactionId === void 0
        ? void 0
        : transactionId.split("-easy-shop")[0];
    const orderData = yield prisma_1.default.order.findUnique({
      where: {
        id: trnxId,
      },
    });
    if (verifyResponse && verifyResponse.pay_status === "Successful") {
      const result = yield prisma_1.default.$transaction((transactionClient) =>
        __awaiter(void 0, void 0, void 0, function* () {
          const payment = yield transactionClient.payment.create({
            data: {
              amount:
                orderData === null || orderData === void 0
                  ? void 0
                  : orderData.totalPrice,
              transactionId,
              orderId: trnxId,
            },
          });
          const order = yield transactionClient.order.update({
            where: {
              id: trnxId,
            },
            data: {
              paymentStatus: "PAID",
              status: "PROCESSING",
            },
          });
          const orderItemIds = yield transactionClient.orderItem.findMany({
            where: {
              orderId: trnxId,
            },
            select: {
              id: true,
            },
          });
          for (let index = 0; index < orderItemIds.length; index++) {
            const id = orderItemIds[index].id;
            const orderItem = yield transactionClient.orderItem.update({
              where: {
                id: id,
              },
              data: {
                paymentStatus: "PAID",
              },
            });
          }
        })
      );
      message = "Successfully Paid!";
    } else {
      message = "Payment Failed!";
    }
    // const filePath = join(
    //   __dirname,
    //   '../../../../dist/app/modules/Views/confirmation.html',
    // );
    const filePath = (0, path_1.join)(
      __dirname,
      "../../../../public/confirmation.html"
    );
    let template = (0, fs_1.readFileSync)(filePath, "utf-8");
    template = template.replace("{{message}}", message);
    return template;
  });
exports.paymentServices = {
  initiatePayment,
  paymentConfirmation,
};
