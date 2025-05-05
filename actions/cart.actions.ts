"use server";

import { auth } from "@/auth";
import { SERVER_URL } from "@/constants/common";
import { CartType } from "@/type/cart.type";
import axios from "axios";

export async function createCart(cart: CartType) {
  const session = await auth();
  const token = session?.serverTokens.access_token;
  const response = await axios.post(`${SERVER_URL}/cart/create`, cart, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function findCartsAll() {
  const session = await auth();
  const token = session?.serverTokens.access_token;
  const response = await axios.get(`${SERVER_URL}/cart/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function findCartCount() {
  const session = await auth();
  const token = session?.serverTokens.access_token;
  const response = await axios.get(`${SERVER_URL}/cart/count`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function updateCart(cart: CartType) {
  const session = await auth();
  const token = session?.serverTokens.access_token;
  const response = await axios.put(`${SERVER_URL}/cart/update`, cart, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function deleteCart(productId: number) {
  const session = await auth();
  const token = session?.serverTokens.access_token;
  const response = await axios.delete(`${SERVER_URL}/cart/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { productId },
  });
  return response.data;
}
