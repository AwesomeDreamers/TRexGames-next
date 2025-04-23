import { z } from "zod";

export const BannerFormSchema = z.object({
  title: z.string().min(1, { message: "타이틀을 입력하세요." }).trim(),
  link: z.string().min(1, { message: "링크를 입력하세요." }).trim(),
  image: z.string(),
});
