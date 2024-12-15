/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { join } from "path";
import { readFileSync } from "fs";
import { verifyPayment } from "./payment.utils";
import config from "../../../config";
import prisma from "../../../utils/prisma";

const initiatePayment = async (paymentData: any) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: paymentData.userId,
    },
  });
  const transactionId = `easy-shop-${Date.now()}`;

  try {
    const response = await axios.post(config.payment_url!, {
      store_id: config.store_id,
      signature_key: config.signature_key,
      tran_id: `${paymentData.orderId}-${transactionId}`,
      success_url: `http://localhost:5000/api/v1/payment/confirmation?transactionId=${paymentData.orderId}-${transactionId}&status=success`,
      fail_url: `http://localhost:5000/api/v1/payment/confirmation?transactionId=${paymentData.orderId}-${transactionId}&status=failed`,
      cancel_url: "http://localhost:3000/",
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
    });

    await prisma.order.update({
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
};

const paymentConfirmation = async (transactionId: string) => {
  const verifyResponse = await verifyPayment(transactionId);

  let message = "";
  const trnxId = (transactionId as string)?.split("-easy-shop")[0];
  console.log(trnxId, transactionId);
  const orderData = await prisma.order.findUnique({
    where: {
      id: trnxId,
    },
  });

  if (verifyResponse && verifyResponse.pay_status === "Successful") {
    const result = await prisma.$transaction(async (transactionClient) => {
      const payment = await transactionClient.payment.create({
        data: {
          amount: orderData?.totalPrice!,
          transactionId,
          orderId: trnxId,
        },
      });

      const order = await transactionClient.order.update({
        where: {
          id: trnxId,
        },
        data: {
          paymentStatus: "PAID",
          status: "PROCESSING",
        },
      });

      const orderItemIds = await transactionClient.orderItem.findMany({
        where: {
          orderId: trnxId,
        },
        select: {
          id: true,
        },
      });

      for (let index = 0; index < orderItemIds.length; index++) {
        const id = orderItemIds[index].id;
        const orderItem = await transactionClient.orderItem.update({
          where: {
            id: id,
          },
          data: {
            paymentStatus: "PAID",
          },
        });
      }
    });

    message = "Successfully Paid!";
  } else {
    message = "Payment Failed!";
  }

  // const filePath = join(
  //   __dirname,
  //   '../../../../dist/app/modules/Views/confirmation.html',
  // );
  const filePath = join(__dirname, "../../../../public/confirmation.html");
  let template = readFileSync(filePath, "utf-8");

  template = template.replace("{{message}}", message);

  return template;
};

export const paymentServices = {
  initiatePayment,
  paymentConfirmation,
};
