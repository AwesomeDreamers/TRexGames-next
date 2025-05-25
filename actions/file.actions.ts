"use server";

import { SERVER_URL } from "@/constants/common";
import axios from "axios";
import { auth } from "./../auth";

export async function imageUpload(formData: FormData) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.post(`${SERVER_URL}/file/image`, formData, {
      headers: {
        authorization: `Bearer ${token}`,
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

export async function changePathContentImage(data: {
  urls: string[];
  slug: string;
}) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  console.log("업로드할 파일:", data.urls);
  console.log("업로드할 파일 개수:", data.urls.length);
  console.log("slug:", data.slug);

  try {
    const response = await axios.post(
      `${SERVER_URL}/file/content/image-path`,
      data,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}
