import { BannerFormSchema } from "@/validation/banner.schema";
import { z } from "zod";

export type BannerFormType = z.infer<typeof BannerFormSchema>;
export type BannerType = z.infer<typeof BannerFormSchema> & {
  id: number;
  image: {
    url: string;
  };
  createdAt: string;
  updatedAt: string;
};
