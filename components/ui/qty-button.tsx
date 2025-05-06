"use client";

import { useUpdateCart } from "@/hooks/query/cart.queires";
import { CartItemType } from "@/type/cart.type";
import { useEffect, useState } from "react";
import { Icon } from "./icon";

interface Props {
  item: CartItemType;
  onQuantityChange?: (quantity: number) => void;
}

export default function QtyButton({ item, onQuantityChange }: Props) {
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const updateCart = useUpdateCart(item.productId);

  useEffect(() => {
    setQuantity(item.quantity || 1);
  }, [item.quantity]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;

    const previousQuantity = quantity;
    setQuantity(newQuantity);
    onQuantityChange?.(newQuantity);

    updateCart.mutate(newQuantity, {
      onError: () => {
        setQuantity(previousQuantity);
      },
    });
  };

  return (
    <div
      className="w-20 h-7 flex items-center bg-[#404044] overflow-hidden rounded-xl"
      style={{ transition: "border 0.3 ease" }}
    >
      <button
        className="size-7 flex items-center justify-center border-none cursor-pointer hover:bg-[#505052]"
        style={{ transition: "all 0.3 ease" }}
        onClick={() => handleQuantityChange(quantity - 1)}
        disabled={quantity <= 1}
      >
        <Icon.minus className="size-4" />
      </button>
      <p className="size-7 text-sm flex items-center justify-center">
        {quantity}
      </p>
      <button
        className="size-7 flex items-center justify-center border-none cursor-pointer hover:bg-[#505052]"
        style={{ transition: "all 0.3 ease" }}
        onClick={() => handleQuantityChange(quantity + 1)}
      >
        <Icon.adminAddProduct className="size-4" />
      </button>
    </div>
  );
}
