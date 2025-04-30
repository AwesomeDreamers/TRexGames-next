import { CouponFormSchema } from "@/validation/coupon.schema";
import { z } from "zod";

export type CouponFormType = z.infer<typeof CouponFormSchema>;
export type CouponType = z.infer<typeof CouponFormSchema> & {
  id: string;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
};
