import { CartItemType } from "./cart.type";

export type createOrderType = {
  items: CartItemType[];
  total: number;
  couponId?: string;
  orderName: string;
};

export type OrderItemType = {
  createdAt: string;
  discount: number;
  id: string;
  orderId: string;
  price: number;
  productId: number;
  productCategory: string;
  productImage: string;
  productKey: string;
  productName: string;
  productPlatform: string;
  quantity: number;
  updatedAt: string;
};

export type OrderType = {
  id: string;
  items: OrderItemType[];
  total: number;
  couponId?: string;
  coupon?: {
    code: string;
    createdAt: string;
    discount: number;
    endDate: string;
    startDate: string;
    updatedAt: string;
    usageCount: number;
    usageLimit: number;
  };
  orderName: string;
  userId: string;
  status: "PENDING" | "FAILED" | "SUCCESS";
  createdAt: string;
};

export type updateOrderStatusType = {
  orderId: string;
  status: "PENDING" | "FAILED" | "SUCCESS";
};
