export type CartType = {
  productId: number;
  quantity?: number;
};

export type CartItemType = {
  discount: number;
  id: string;
  image: string;
  name: string;
  price: number;
  category: {
    id: string;
    name: string;
  };
  platform: {
    id: string;
    name: string;
  };
  productId: number;
  quantity: number;
};
