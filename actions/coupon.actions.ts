"use server";

import { auth } from "@/auth";
import { SERVER_URL } from "@/constants/common";
import { CouponFormType } from "@/type/coupon.type";
import axios from "axios";

export async function createCoupon(values: CouponFormType) {
  const session = await auth();
  const token = session?.serverTokens.access_token;
  console.log("value");

  const data = {
    ...values,
    usageLimit: Number(values.usageLimit),
    discount: Number(values.discount),
  };

  const response = await axios.post(`${SERVER_URL}/coupon/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { status, message, payload } = response.data;
  return { status, message, payload };
}

export async function findCouponsAll() {
  const session = await auth();
  const token = session?.serverTokens.access_token;
  const response = await axios.get(`${SERVER_URL}/coupon/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { status, message, payload } = response.data;
  return { status, message, payload };
}

export async function deleteCoupons(ids: number[]) {
  const session = await auth();
  const token = session?.serverTokens.access_token;
  const response = await axios.delete(`${SERVER_URL}/coupon/deletes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: ids,
  });
  const { status, message, payload } = response.data;
  return { status, message, payload };
}

export async function deleteCoupon(id?: number) {
  const session = await auth();
  const token = session?.serverTokens.access_token;
  const response = await axios.delete(`${SERVER_URL}/coupon/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
