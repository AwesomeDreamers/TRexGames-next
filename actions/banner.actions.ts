"use server";

import { auth } from "@/auth";
import { SERVER_URL } from "@/constants/common";
import { BannerFormType } from "@/type/banner.type";
import { BannerFormSchema } from "@/validation/banner.schema";
import axios from "axios";

export async function createBanner(values: BannerFormType) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  const data = BannerFormSchema.parse(values);
  try {
    const response = await axios.post(`${SERVER_URL}/banner/create`, data, {
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

export async function findBannersAll(filter: {
  page: number;
  take: number;
  title: string;
}) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  const params = new URLSearchParams();
  params.set("page", filter.page.toString());
  params.set("take", filter.take.toString());
  if (filter.title) params.set("title", filter.title);
  try {
    const response = await axios.get(
      `${SERVER_URL}/banner/all?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.body;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}

export async function deleteBanners(ids: string[]) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.delete(`${SERVER_URL}/banner/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: ids,
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

export async function deleteBanner(id?: string) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.delete(`${SERVER_URL}/banner/delete/${id}`, {
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
