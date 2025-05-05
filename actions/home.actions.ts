"use server";

import { SERVER_URL } from "@/constants/common";
import axios from "axios";

export async function findLatestProductsAll() {
  const response = await axios.get(`${SERVER_URL}/home/latest`);
  return response.data;
}

export async function findPopularProductsAll() {
  const response = await axios.get(`${SERVER_URL}/home/popular`);
  return response.data;
}

export async function findSwiperBannersAll() {
  const response = await axios.get(`${SERVER_URL}/home/swiper`);
  return response.data;
}
