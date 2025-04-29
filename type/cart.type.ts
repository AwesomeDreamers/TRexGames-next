export type CartType = {
  productId: number;
  quantity?: number;
};

export type CartItemType = {
  discount: number;
  id: number;
  image: string;
  name: string;
  price: number;
  productId: number;
  quantity: number;
};
