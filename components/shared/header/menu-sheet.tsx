"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useFindCartsAll } from "@/hooks/query/cart.queires";
import { useCartStore, useMenuStore } from "@/hooks/store/user.store";
import { useSession } from "next-auth/react";
import Search from "./search";

export function MenuSheet() {
  const { isMenuOpen, onMenuClose } = useMenuStore();
  const { onCartOpen } = useCartStore();
  const { data, isLoading } = useFindCartsAll();
  const { data: session } = useSession();
  const noImage = "/images/noProfileImage.jpg";
  const userImage = session?.user?.image || noImage;
  if (isLoading) return null;
  const cartCount = data?.payload?.length || 0;
  return (
    <Sheet open={isMenuOpen} onOpenChange={onMenuClose}>
      <SheetContent className=" lg:max-w-md">
        <div className="p-6">
          <div className="flex flex-col gap-6">
            <SheetHeader className="flex items-center justify-between">
              <SheetTitle>메뉴</SheetTitle>
            </SheetHeader>
            <Search />
            <p>내 계정</p>
            <div className="w-full flex flex-col gap-4">
              <Button
                variant={"ghost"}
                className="w-full flex justify-between items-center"
                onClick={() => {
                  onMenuClose();
                  onCartOpen();
                }}
              >
                <p>카트</p>
                <p>{cartCount}</p>
              </Button>
              <Button
                variant={"ghost"}
                className="w-full flex justify-between items-center"
              >
                프로필
              </Button>
              <Button
                variant={"ghost"}
                className="w-full flex justify-between items-center"
              >
                구매내역
              </Button>
            </div>
            <p>게임목록</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
