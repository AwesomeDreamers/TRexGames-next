import { z } from "zod";

export const CouponFormSchema = z.object({
  code: z.string().trim().min(1, { message: "쿠폰 코드를 입력하세요." }),
  startDate: z.date().min(new Date(), { message: "시작일을 입력하세요." }),
  endDate: z.date().min(new Date(), { message: "종료일을 입력하세요." }),
  usageLimit: z.string().trim(),
  discount: z
    .string()
    .min(0, { message: "할인은 0 이상이어야 합니다." })
    .max(100, { message: "할인은 100 이하이어야 합니다." })
    .optional(),
});
