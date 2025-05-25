"use server";

import { SERVER_URL } from "@/constants/common";
import axios from "axios";

export async function findLatestProductsAll() {
  try {
    const response = await axios.get(`${SERVER_URL}/home/latest`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}

export async function findPopularProductsAll() {
  try {
    const response = await axios.get(`${SERVER_URL}/home/popular`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}

export async function findSwiperBannersAll() {
  try {
    const response = await axios.get(`${SERVER_URL}/home/swiper`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}
