"use server";

import { SERVER_URL } from "@/constants/common";
import axios from "axios";
export async function findCategoryAll() {
  try {
    const response = await axios.get(`${SERVER_URL}/category`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}
