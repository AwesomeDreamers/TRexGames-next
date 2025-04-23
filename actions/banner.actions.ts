"use server";

import { auth } from "@/auth";
import { SERVER_URL } from "@/constants/common";
import { BannerFormType } from "@/type/banner.type";
import { BannerFormSchema } from "@/validation/banner.schema";
import axios from "axios";

export async function createBanner(values: BannerFormType) {
  const session = await auth();
  const token = session?.serverTokens.access_token;
  const data = BannerFormSchema.parse(values);

  const response = await axios.post(`${SERVER_URL}/banner/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { status, message, payload } = response.data;
  return { status, message, payload };
}

export async function findBannersAll() {
  const response = await axios.get(`${SERVER_URL}/banner/all`, {});
  const { status, message, payload } = response.data;
  return { status, message, payload };
}

export async function deleteBanners(ids: number[]) {
  const session = await auth();
  const token = session?.serverTokens.access_token;
  const response = await axios.delete(`${SERVER_URL}/banner/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: ids,
  });
  const { status, message, payload } = response.data;
  return { status, message, payload };
}

export async function deleteBanner(id?: number) {
  const session = await auth();
  const token = session?.serverTokens.access_token;
  const response = await axios.delete(`${SERVER_URL}/banner/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
