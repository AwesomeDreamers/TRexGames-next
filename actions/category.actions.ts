"use server";

import { SERVER_URL } from "@/constants/common";
import axios from "axios";
export async function findCategoryAll() {
  const response = await axios.get(`${SERVER_URL}/category`);
  return response.data;
}
