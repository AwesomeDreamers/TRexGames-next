"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useFindCartCount } from "@/hooks/query/cart.queires";
import { useFindWishlistCount } from "@/hooks/query/wishlist.queries";
import { useCartStore, useMenuStore } from "@/hooks/store/user.store";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Search from "./search";

export function MenuSheet() {
  const { isMenuOpen, onMenuClose } = useMenuStore();
  const { onCartOpen } = useCartStore();
  const router = useRouter();
  const cart = useFindCartCount();
  const wishlist = useFindWishlistCount();
  const { data: session } = useSession();
  const cartCount = cart.data?.payload || 0;
  const wishlistCount = wishlist.data?.payload || 0;

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
                onClick={() => {
                  if (!session || !session.user) {
                    onMenuClose();
                    toast.error("로그인 후 이용해주세요.");
                    router.push("/login");
                    return;
                  } else {
                    onMenuClose();
                    router.push("/wishlist");
                  }
                }}
              >
                <p>찜 목록</p>
                <p>{wishlistCount}</p>
              </Button>
              <Button
                variant={"ghost"}
                className="w-full flex justify-between items-center"
                onClick={() => {
                  if (!session || !session.user) {
                    onMenuClose();
                    toast.error("로그인 후 이용해주세요.");
                    router.push("/login");
                    return;
                  } else {
                    onMenuClose();
                    router.push("/account");
                  }
                }}
              >
                내 계정
              </Button>
              {session ? (
                <Button
                  variant={"ghost"}
                  className="w-full flex justify-between items-center"
                  onClick={async () => {
                    onMenuClose();
                    await signOut();
                    router.push("/login");
                  }}
                >
                  로그아웃
                </Button>
              ) : (
                <Button
                  variant={"ghost"}
                  className="w-full flex justify-between items-center"
                  onClick={() => {
                    onMenuClose();
                    router.push("/login");
                  }}
                >
                  로그인
                </Button>
              )}
            </div>
            <p>게임</p>
            <div className="w-full flex flex-col gap-4">
              <Button
                variant={"ghost"}
                className="w-full flex justify-between items-center"
                onClick={() => {
                  onMenuClose();
                  router.push("/browse");
                }}
              >
                게임 목록
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
