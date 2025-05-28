"use server";

import { auth } from "@/auth";
import { SERVER_URL } from "@/constants/common";
import { CouponFormType } from "@/type/coupon.type";
import axios from "axios";

export async function createCoupon(values: CouponFormType) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  const data = {
    ...values,
    usageLimit: Number(values.usageLimit),
    discount: Number(values.discount),
  };
  try {
    const response = await axios.post(`${SERVER_URL}/coupon/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.body;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}

export async function findCouponsAll() {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.get(`${SERVER_URL}/coupon/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.body;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}

export async function deleteManyCoupons(ids: string[]) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.delete(`${SERVER_URL}/coupon/deletes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: ids,
    });
    return response.data.body;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}

export async function deleteCoupon(id?: string) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.delete(`${SERVER_URL}/coupon/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}
