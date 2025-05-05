"use server";

import { auth } from "@/auth";
import { SERVER_URL } from "@/constants/common";
import { CartItemType } from "@/type/cart.type";
import { createOrderType } from "@/type/order.type";
import axios from "axios";

export async function createPaypalOrder(items: CartItemType[], total: number) {
  const session = await auth();
  const token = session?.serverTokens.access_token;

  const data = {
    items,
    total,
  };

  const response = await axios.post(
    `${SERVER_URL}/order/create-paypal-order`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

export async function capturePayPalOrder(orderId: number) {
  const session = await auth();
  const token = session?.serverTokens.access_token;
  const response = await axios.post(
    `${SERVER_URL}/order/capture-paypal-order`,
    { orderId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

export async function CreateOrder(values: createOrderType) {
  const session = await auth();
  const token = session?.serverTokens.access_token;
  const response = await axios.post(`${SERVER_URL}/order/create`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { status, message, payload } = response.data;
  return { status, message, payload };
}

export async function findOrderByOrderId(orderId?: string) {
  const session = await auth();
  const token = session?.serverTokens.access_token;
  const response = await axios.get(`${SERVER_URL}/order/order-id/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function findOrderByUserId() {
  const session = await auth();
  const token = session?.serverTokens.access_token;
  const response = await axios.get(`${SERVER_URL}/order/user-id`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function findOrdersAllForAdmin() {
  const session = await auth();
  const token = session?.serverTokens.access_token;
  const response = await axios.get(`${SERVER_URL}/order/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
