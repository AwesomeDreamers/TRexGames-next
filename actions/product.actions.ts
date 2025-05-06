"use server";
import { SERVER_URL } from "@/constants/common";
import { ProductFilterType, ProductFormType } from "@/type/product.type";
import axios from "axios";
import { auth } from "../auth";

export async function createProduct(values: ProductFormType) {
  const session = await auth();
  const token = session?.serverTokens.access_token;
  const response = await axios.post(`${SERVER_URL}/product/create`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { status, message, payload } = response.data;
  return { status, message, payload };
}

export async function findProductsAll(productFilter: ProductFilterType) {
  const params = new URLSearchParams();
  if (productFilter.categories.length > 0)
    params.set("categories", productFilter.categories.join(","));
  if (productFilter.platforms.length > 0)
    params.set("platforms", productFilter.platforms.join(","));
  if (productFilter.minPrice !== undefined) {
    params.set("minPrice", productFilter.minPrice.toString());
  }
  if (productFilter.maxPrice !== undefined) {
    params.set("maxPrice", productFilter.maxPrice.toString());
  }
  params.set("page", productFilter.page.toString());
  params.set("take", productFilter.take.toString());
  if (productFilter.sortBy) params.set("sortBy", productFilter.sortBy);
  if (productFilter.sortOrder) params.set("sortOrder", productFilter.sortOrder);
  if (productFilter.name) params.set("name", productFilter.name);

  const response = await axios(
    `${SERVER_URL}/product/all?${params.toString()}`
  );
  return response.data;
}

export async function findProductById(id?: number) {
  const response = await axios.get(`${SERVER_URL}/product/${id}`);
  const { status, message, payload } = response.data;
  return { status, message, payload };
}

export async function updateProduct(values: ProductFormType, id?: number) {
  const session = await auth();
  const token = session?.serverTokens.access_token;
  const response = await axios.put(`${SERVER_URL}/product/${id}`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { status, message, payload } = response.data;
  return { status, message, payload };
}

export async function deleteManyProducts(ids: number[]) {
  const session = await auth();
  const token = session?.serverTokens.access_token;
  const response = await axios.delete(`${SERVER_URL}/product/delete-many`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: ids,
  });
  const { status, message, payload } = response.data;
  return { status, message, payload };
}

export async function deleteProduct(id?: number) {
  const session = await auth();
  const token = session?.serverTokens.access_token;
  const response = await axios.delete(`${SERVER_URL}/product/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
