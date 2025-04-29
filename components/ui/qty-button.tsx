"use client";

import { useUpdateCart } from "@/hooks/query/cart.queires";
import { CartItemType } from "@/type/cart.type";
import { useEffect, useState } from "react";
import { Icon } from "./icon";

export default function QtyButton({ item }: { item: CartItemType }) {
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const updateCart = useUpdateCart(item.productId);

  useEffect(() => {
    setQuantity(item.quantity || 1);
  }, [item.quantity]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCart.mutate(newQuantity);
  };

  return (
    <div
      className="w-20 h-7 flex items-center bg-[#404044] overflow-hidden rounded-xl"
      style={{ transition: "border 0.3 ease" }}
    >
      <button
        className="size-7 flex items-center justify-center border-none cursor-pointer hover:bg-[#505052]"
        style={{ transition: "all 0.3 ease" }}
        onClick={() => {
          const newQuantity = quantity - 1;
          setQuantity(newQuantity);
          handleQuantityChange(newQuantity);
        }}
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
        onClick={() => {
          const newQuantity = quantity + 1;
          setQuantity(newQuantity);
          handleQuantityChange(newQuantity);
        }}
      >
        <Icon.adminAddProduct className="size-4" />
      </button>
    </div>
  );
}
