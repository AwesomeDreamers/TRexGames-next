import { ProductType } from "./product.type";

export type WishlistType = {
  userId: number;
  productId: number;
  product: ProductType;
  createdAt: string;
};
