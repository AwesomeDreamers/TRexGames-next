import { ProductFormSchema } from "@/validation/product.schema";
import { z } from "zod";

export type ProductFormType = z.infer<typeof ProductFormSchema>;
export type ProductType = z.infer<typeof ProductFormSchema> & {
  id: number;
  category: {
    id: string;
    name: string;
  };
  platform: {
    id: string;
    name: string;
  };
  rating: number;
  images: {
    id: string;
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
  id: string;
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
