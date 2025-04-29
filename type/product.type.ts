import { ProductFormSchema } from "@/validation/product.schema";
import { z } from "zod";

export type ProductFormType = z.infer<typeof ProductFormSchema>;
export type ProductType = z.infer<typeof ProductFormSchema> & {
  id: number;
  category: {
    id: number;
    name: string;
  };
  platform: {
    id: number;
    name: string;
  };
  rating: number;
  images: {
    id: number;
    url: string;
  }[];

  specs: {
    cpu: string;
    gpu: string;
    ram: string;
    os: string;
    storage: string;
    directX: string;
  }[];
  numReviews: number;
  createdAt: string;
  updatedAt: string;
};

export type ProductImageType = {
  id: number;
  url: string;
  productId?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type ProductQueryType = {
  categories?: string[];
  platforms?: string[];
  priceRange?: [number, number];
  page?: number;
  sortBy?: string;
  name?: string;
  sortOrder?: "asc" | "desc";
};
