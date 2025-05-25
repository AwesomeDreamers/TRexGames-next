"use server";
import { SERVER_URL } from "@/constants/common";
import { ReviewFilterType, ReviewFormType } from "@/type/review.type";
import axios from "axios";
import { auth } from "../auth";

export async function createReview(values: ReviewFormType) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.post(`${SERVER_URL}/review/create`, values, {
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

export async function findReviewsAll() {
  try {
    const response = await axios.get(`${SERVER_URL}/review/all`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}

export async function findReviewByProductIdAndUserId(productId?: number) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.get(
      `${SERVER_URL}/review/user-id/product-id/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

export async function findReviewsByProductId(filters: ReviewFilterType) {
  const {
    currentPage = 1,
    sortBy = "createdAt",
    sortOrder = "desc",
    productId,
  } = filters;
  const page = currentPage;
  const params = new URLSearchParams();
  if (page) params.append("page", page.toString());
  if (sortBy !== "createdAt" || sortOrder !== "desc") {
    params.append("sortOrder", sortOrder);
    params.append("sortBy", sortBy);
  }
  try {
    const response = await axios.get(
      `${SERVER_URL}/review/product-id/${productId}?${params.toString()}`
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

export async function updateReview(values: ReviewFormType, id?: string) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.put(
      `${SERVER_URL}/review/update/${id}`,
      values,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
export async function deleteReview(productId?: number) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.delete(
      `${SERVER_URL}/product/delete/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
