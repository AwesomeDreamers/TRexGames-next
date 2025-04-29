"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useFindCartsAll } from "@/hooks/query/cart.queires";
import { useCartStore } from "@/hooks/store/user.store";
import { currencyPrice } from "@/lib/utils";
import { CartItemType } from "@/type/cart.type";
import { useRouter } from "next/navigation";
import CartItem from "./cart-item";

export function CartSheet() {
  const { isCartOpen, onCartClose } = useCartStore();
  const { data, isLoading } = useFindCartsAll();
  const router = useRouter();
  const findCartsAll = data?.payload || [];
  const totalPriceAfterDiscount = findCartsAll.reduce(
    (acc: number, cart: CartItemType) => {
      const discountedPrice = parseFloat(
        currencyPrice(cart.price * (cart.quantity || 1), cart.discount).replace(
          /[^0-9.-]+/g,
          ""
        )
      );
      return acc + discountedPrice;
    },
    0
  );

  return (
    <Sheet open={isCartOpen} onOpenChange={onCartClose}>
      <SheetContent className="lg:max-w-md">
        <SheetHeader>
          <SheetTitle>내 장바구니</SheetTitle>
        </SheetHeader>
        <div className="px-4 flex flex-col h-[700px] overflow-y-auto gap-2">
          {isLoading ? null : findCartsAll.length > 0 ? (
            findCartsAll.map((cartItem: CartItemType) => (
              <CartItem key={cartItem.id} item={cartItem} />
            ))
          ) : (
            <p className="text-muted-foreground">상품이 존재하지 않습니다.</p>
          )}
        </div>

        <SheetFooter>
          <div className="flex items-center justify-between w-full mt-4">
            <p className="text-muted-foreground">총 결제금액</p>
            <p className="font-bold">
              {currencyPrice(totalPriceAfterDiscount, 0)}
            </p>
          </div>
          <SheetClose asChild>
            <Button type="submit">결제</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button type="button" onClick={() => router.push("/cart")}>
              장바구니 보기
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
