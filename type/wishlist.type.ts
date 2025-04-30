import { ProductType } from "./product.type";

export type WishlistType = {
  userId: string;
  productId: number;
  product: ProductType;
  createdAt: string;
};
