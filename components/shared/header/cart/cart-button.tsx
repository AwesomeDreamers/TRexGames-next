import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { currencyPrice } from "@/lib/utils";
import Link from "next/link";
import CartItem from "./cart-item";

export function CartButton() {
  const product = {
    id: 6,
    src: "/swiper/6-1.avif",
    alt: "Image 6",
    genre: "액션",
    title: "몬스터 헌터 와일즈",
    price: 84800,
    discount: 25,
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative cursor-pointer">
          <Icon.cart className="size-7 text-muted-foreground hover:text-foreground mr-7" />
          <span className="absolute top-0 right-6 bg-[red] size-4 rounded-full text-xs text-center">
            0
          </span>
        </div>
      </SheetTrigger>
      <SheetContent className="z-[1100]">
        <SheetHeader>
          <SheetTitle>내 장바구니</SheetTitle>
        </SheetHeader>
        <div className="px-4 flex flex-col overflow-y-scroll gap-2">
          <CartItem product={product} />
          {/* <p className="text-muted-foreground">상품이 존재하지 않습니다.</p> */}
        </div>

        <SheetFooter>
          <div className="flex items-center justify-between w-full mt-4">
            <p className="text-muted-foreground">총 결제금액</p>
            <p className="font-bold">
              {currencyPrice(product.price, product.discount)}
            </p>
          </div>
          <SheetClose asChild>
            <Button type="submit">결제</Button>
          </SheetClose>
          <Button>
            <Link href="/cart">장바구니 보기</Link>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
