"use server";

import { SERVER_URL } from "@/constants/common";
import axios from "axios";
export async function findPlatformAll() {
  const response = await axios.get(`${SERVER_URL}/platform`);
  return response.data;
}
