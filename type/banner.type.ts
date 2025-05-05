import { BannerFormSchema } from "@/validation/banner.schema";
import { z } from "zod";

export type BannerFormType = z.infer<typeof BannerFormSchema>;
export type BannerType = z.infer<typeof BannerFormSchema> & {
  id: string;
  images: {
    id: string;
    url: string;
  }[];
  createdAt: string;
  updatedAt: string;
};
