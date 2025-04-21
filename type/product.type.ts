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
  createdAt: string;
  updatedAt: string;
};
