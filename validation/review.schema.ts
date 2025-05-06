import { z } from "zod";

export const ReviewFormSchema = z.object({
  title: z.string().min(1, { message: "리뷰 제목을 입력하세요." }).trim(),
  content: z.string().min(1, { message: "리뷰 내용을 입력하세요." }).trim(),
  rating: z.number().min(1, { message: "평점을 입력하세요." }),
});
