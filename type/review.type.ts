import { ReviewFormSchema } from "@/validation/review.schema";
import { z } from "zod";

export type ReviewFormType = z.infer<typeof ReviewFormSchema> & {
  productId?: number;
  userId?: string;
};

export type ReviewType = z.infer<typeof ReviewFormSchema> & {
  productId: number;
  userId: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  user: {
    image: string | null;
    name: string;
  };
  product?: {
    name: string;
  };
};

export type ReviewFilterType = {
  currentPage: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
  productId?: number;
};
