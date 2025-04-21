import { ProductFormSchema } from "@/validation/product.schema";
import { z } from "zod";

export type ProductFormType = z.infer<typeof ProductFormSchema>;
