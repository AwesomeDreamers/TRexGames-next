"use server";

import { auth } from "@/auth";
import { SERVER_URL } from "@/constants/common";
import axios from "axios";

export async function addWishlist(productId: number) {
  const session = await auth();
  const token = session?.serverTokens.access_token;
  const response = await axios.post(
    `${SERVER_URL}/wishlist/add`,
    { productId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

export async function findWishlistsAll() {
  const session = await auth();
  const token = session?.serverTokens.access_token;
  const response = await axios.get(`${SERVER_URL}/wishlist/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function findWishlistCount() {
  const session = await auth();
  const token = session?.serverTokens.access_token;
  const response = await axios.get(`${SERVER_URL}/wishlist/count`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function deleteWishlist(productId: number) {
  const session = await auth();
  const token = session?.serverTokens.access_token;
  const response = await axios.delete(`${SERVER_URL}/wishlist/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { productId },
  });
  return response.data;
}
