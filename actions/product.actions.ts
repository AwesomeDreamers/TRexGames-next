"use server";
import { SERVER_URL } from "@/constants/common";
import { ProductFormType, ProductQueryType } from "@/type/product.type";
import axios from "axios";
import { auth } from "../auth";

export async function createProduct(values: ProductFormType) {
  const session = await auth();
  const token = session?.serverTokens.access_token;
  const data = {
    ...values,
    price: Number(values.price),
    discount: Number(values.discount),
    platformId: Number(values.platformId),
    categoryId: Number(values.categoryId),
  };
  const response = await axios.post(`${SERVER_URL}/product/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { status, message, payload } = response.data;
  return { status, message, payload };
}

export async function findProductsAll() {
  const response = await axios.get(`${SERVER_URL}/product/all`);
  const { status, message, payload } = response.data;
  return { status, message, payload };
}

export async function findProductById(id?: number) {
  const response = await axios.get(`${SERVER_URL}/product/${id}`);
  const { status, message, payload } = response.data;
  return { status, message, payload };
}

export async function updateProduct(values: ProductFormType, id?: number) {
  console.log("updateProduct", values, id);

  const session = await auth();
  const token = session?.serverTokens.access_token;
  const data = {
    ...values,
    price: Number(values.price),
    discount: Number(values.discount),
    platformId: Number(values.platformId),
    categoryId: Number(values.categoryId),
  };
  const response = await axios.put(`${SERVER_URL}/product/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { status, message, payload } = response.data;
  return { status, message, payload };
}

export async function deleteProducts(ids: number[]) {
  const session = await auth();
  const token = session?.serverTokens.access_token;
  const response = await axios.delete(`${SERVER_URL}/product/deletes`, {
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

// export async function findProductsAllForClient(params: URLSearchParams) {
//   const url = `${SERVER_URL}/product?${params.toString()}`;
//   console.log("action Generated URL:", url);

//   const response = await axios.get(url);
//   return response.data;
// }

export async function findProductsAllForClient({
  ProductQueryType,
}: {
  ProductQueryType: ProductQueryType;
}) {
  const {
    categories = [],
    platforms = [],
    priceRange = [0, 100000],
    page = 1,
    sortBy = "createdAt",
    name = "",
    sortOrder = "desc",
  } = ProductQueryType;

  const queryParams = new URLSearchParams();

  if (categories.length > 0) {
    queryParams.append("categories", categories.join(","));
  }
  if (platforms.length > 0) {
    queryParams.append("platforms", platforms.join(","));
  }
  if (priceRange) {
    queryParams.append("minPrice", priceRange[0].toString());
    queryParams.append("maxPrice", priceRange[1].toString());
  }
  queryParams.append("page", page.toString());

  if (sortBy !== "createdAt" || sortOrder !== "desc") {
    queryParams.append("sortOrder", sortOrder);
    queryParams.append("sortBy", sortBy);
  }
  if (name) {
    queryParams.append("name", name);
  }

  const response = await axios(
    `${SERVER_URL}/product?${queryParams.toString()}`
  );
  return response.data;
}
