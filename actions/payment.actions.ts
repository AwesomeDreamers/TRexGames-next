"use server";

import { auth } from "@/auth";
import { SERVER_URL } from "@/constants/common";
import {
  CreatePaymentType,
  PaymentRequestType,
  PaymentResponseType,
} from "@/type/payment.type";
import axios from "axios";

export async function CreatePayment(values: CreatePaymentType) {
  const session = await auth();
  const token = session?.serverTokens.access_token;

  const response = await axios.post(`${SERVER_URL}/payment/create`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { status, message, payload } = response.data;
  return { status, message, payload };
}

export async function requestPayment({
  paymentKey,
  orderId,
  amount,
}: PaymentRequestType) {
  const session = await auth();
  const token = session?.serverTokens.access_token;
  try {
    const { data: payment } = await axios.post<PaymentResponseType>(
      `https://api.tosspayments.com/v1/payments/confirm`,
      {
        paymentKey,
        orderId,
        amount,
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.TOSS_PAYMENTS_KEY}:`
          ).toString("base64")}`,
        },
      }
    );
    if (payment) {
      const updatePayment = await axios.put(
        `${SERVER_URL}/payment/update`,
        {
          orderId,
          paymentKey,
          amount: payment.totalAmount,
          orderStatus: "SUCCESS",
          status: payment.status,
          method: payment?.method,
          receiptUrl: payment?.receipt?.url,
          requestedAt: payment?.requestedAt,
          approvedAt: payment?.approvedAt,
          cardNumber: payment?.card?.number,
          cardType: payment?.card?.cardType,
          type: payment?.type,
          mId: payment?.mId,
          checkoutUrl: payment?.checkout?.url,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { payload } = updatePayment.data;
      return payload;
    }
  } catch (error: any) {
    if (error.code === "ERR_BAD_REQUEST") {
      const response = await axios.get(`${SERVER_URL}/payment/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { status, payload } = response.data;
      if (status === 200) {
        return payload;
      }
    }
    await axios.put(`${SERVER_URL}/payment/update`, {
      orderId,
      paymentKey,
      amount,
      orderStatus: "FAILED",
      failureCode: error.code,
      failureMessage: error.message,
    });

    return {
      redirect: {
        destination: `/payments/fail?code=${error.code}&message=${error.message}&orderId=${orderId}`,
      },
    };
  }
}
