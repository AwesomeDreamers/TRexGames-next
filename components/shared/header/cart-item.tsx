"use client";
import { Button } from "@/components/ui/button";
import QtyButton from "@/components/ui/qty-button";
import { useDeleteCart } from "@/hooks/query/cart.queires";
import { currencyPrice } from "@/lib/utils";
import { CartItemType } from "@/type/cart.type";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CartItem({ item }: { item: CartItemType }) {
  const [totalPrice, setTotalPrice] = useState(
    currencyPrice(item.price * item.quantity, item.discount)
  );
  useEffect(() => {
    const updatedPrice = currencyPrice(
      item.price * item.quantity,
      item.discount
    );
    setTotalPrice(updatedPrice);
  }, [item.quantity, item.price, item.discount]);

  const deleteCartItem = useDeleteCart(item.productId);
  return (
    <div className="w-full bg-[#28282c] flex items-center p-4 rounded-xl">
      <div className="w-[30%]">
        <Image src={item.image} width={60} height={85} alt={item.name} />
      </div>
      <div className="w-[70%] flex flex-col items-start">
        <div className="flex items-center justify-between w-full">
          <h2>{item.name}</h2>
          <Button
            size={"icon"}
            className="focus-visible:ring-0 cursor-pointer rounded-full text-muted-foreground"
            variant={"ghost"}
            onClick={() => {
              deleteCartItem.mutate(undefined, {
                onSuccess: () => {
                  toast.success("장바구니에서 삭제되었습니다.");
                },
                onError: () => {
                  toast.error("장바구니에서 삭제하는데 실패했습니다.");
                },
              });
            }}
          >
            <Trash2 />
          </Button>
        </div>
        <div className="flex items-end justify-between w-full mt-2">
          <QtyButton item={item} />
          <div className="flex flex-col">
            <p className="ml-2">{totalPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
