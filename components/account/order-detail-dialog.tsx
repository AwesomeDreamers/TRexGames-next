"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFindOrderByOrderId } from "@/hooks/query/order.queires";
import { useOpenOrderStore } from "@/hooks/store/order.store";
import { currencyPrice } from "@/lib/utils";
import { OrderItemType, OrderType } from "@/type/order.type";
import OrderCard from "./order-card";

export default function OrderDetailDialog() {
  const { isOpen, onClose, orderId } = useOpenOrderStore();
  const { data } = useFindOrderByOrderId(orderId);

  const findOrdersByOrderId: OrderType = data?.payload;
  if (!findOrdersByOrderId || !findOrdersByOrderId.items?.length) return null;

  const subTotal = findOrdersByOrderId.items.reduce(
    (acc: number, item: OrderItemType) =>
      acc + item.price * (item.quantity || 1) * (1 - item.discount / 100),
    0
  );

  const discountAmount = findOrdersByOrderId.coupon
    ? (subTotal * Number(findOrdersByOrderId.coupon.discount)) / 100
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>주문 상세보기</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="min-h-[144px] max-h-[600px] overflow-y-auto">
            {findOrdersByOrderId.items.map((item) => (
              <OrderCard key={item.id} item={item} />
            ))}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h2 className="text-gray-500 text-sm font-bold">소계</h2>
                {findOrdersByOrderId.coupon && (
                  <p className="text-sm text-green-600">
                    쿠폰할인 {findOrdersByOrderId.coupon.discount}%
                  </p>
                )}
                <h2 className="text-lg font-bold">합계</h2>
              </div>
              <div className="text-right space-y-2">
                <p className="text-gray-500 text-sm font-bold">
                  {currencyPrice(subTotal, 0)}
                </p>
                {findOrdersByOrderId.coupon && (
                  <p className="text-sm text-green-600">
                    - {currencyPrice(discountAmount, 0)}
                  </p>
                )}
                <p className="text-lg font-bold">
                  {currencyPrice(findOrdersByOrderId.total, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
