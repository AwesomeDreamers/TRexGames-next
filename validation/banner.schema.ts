import { z } from "zod";

export const BannerFormSchema = z.object({
  title: z.string().min(1, { message: "타이틀을 입력하세요." }).trim(),
  url: z.string().url({ message: "URL을 입력하세요." }).trim(),
  images: z.string().array().optional(),
  price: z.number().min(0, { message: "가격을 입력하세요." }),
});
