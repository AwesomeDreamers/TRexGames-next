import { ProductType } from "./product.type";

export type WishlistType = {
  id: string;
  userId?: string;
  productId: number;
  product: ProductType;
  createdAt?: string;
};
