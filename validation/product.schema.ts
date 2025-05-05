import { z } from "zod";

export const SpecSchema = z.object({
  cpu: z.string().min(1, { message: "CPU를 입력하세요." }).trim(),
  gpu: z.string().min(1, { message: "GPU를 입력하세요." }).trim(),
  ram: z.string().min(1, { message: "RAM을 입력하세요." }).trim(),
  storage: z.string().min(1, { message: "저장 공간를 입력하세요." }).trim(),
  directX: z.string().min(1, { message: "DirectX 버전을 입력하세요." }).trim(),
  os: z.string().min(1, { message: "OS를 입력하세요." }).trim(),
});

export const ProductFormSchema = z.object({
  name: z.string().min(1, { message: "상품 이름을 입력하세요." }).trim(),
  slug: z.string().min(1, { message: "슬러그를 입력하세요." }).trim(),
  description: z.string().min(1, { message: "상품 설명을 입력하세요." }).trim(),
  price: z.number().min(1, { message: "상품 가격을 입력하세요." }),
  platformId: z.string().min(1, { message: "플랫폼을 선택하세요." }),
  categoryId: z.string().min(1, { message: "카테고리를 선택하세요." }),
  discount: z
    .number()
    .min(0, { message: "할인은 0 이상이어야 합니다." })
    .max(100, { message: "할인은 100 이하이어야 합니다." })
    .optional(),
  images: z.string().array().optional(),
  minSpec: SpecSchema,
  recSpec: SpecSchema,
});
