"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";
import { useFindCartsAll } from "@/hooks/query/cart.queires";
import { useFindWishlistAll } from "@/hooks/query/wishlist.queries";
import { useCartStore, useMenuStore } from "@/hooks/store/user.store";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Search from "./search";

export default function UserButton({ session }: { session: Session | null }) {
  const cart = useFindCartsAll();
  const wishlist = useFindWishlistAll();
  const cartCount = cart.data?.payload.length || 0;
  const wishlistCount = wishlist.data?.payload.length || 0;
  const router = useRouter();
  const { onCartOpen } = useCartStore();
  const { onMenuOpen } = useMenuStore();
  const noImage = "/images/noProfileImage.jpg";

  return (
    <div>
      <div className="hidden md:flex items-center gap-6">
        <Search />
        <div
          className="relative cursor-pointer"
          onClick={() => router.push("/wishlist")}
        >
          <Icon.heart className="size-6" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">
            {wishlistCount}
          </span>
        </div>
        <div className="relative cursor-pointer" onClick={onCartOpen}>
          <Icon.cart className="size-6" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        </div>
        <div className="hidden md:block cursor-pointer">
          {session?.user?.name ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={session.user.image ?? noImage}
                    alt={session.user.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push("/account")}>
                  내 계정
                </DropdownMenuItem>
                <DropdownMenuItem onClick={async () => await signOut()}>
                  로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Icon.user className="size-6" />
          )}
        </div>
      </div>
      <div onClick={onMenuOpen}>
        <Icon.menu className="size-6 cursor-pointer md:hidden" />
      </div>
    </div>
  );
}
