"use client";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useCreateCart } from "@/hooks/query/cart.queires";
import {
  useAddWishlist,
  useDeleteWishlist,
  useFindWishlistAll,
} from "@/hooks/query/wishlist.queries";
import { useCartStore } from "@/hooks/store/user.store";
import { WishlistType } from "@/type/wishlist.type";
import { useState } from "react";
import { toast } from "sonner";

export default function CartWishlistButton({
  productId,
}: {
  productId: number;
}) {
  const { onCartOpen } = useCartStore();
  const createCart = useCreateCart(productId);
  const addWishlist = useAddWishlist();
  const deleteWishlist = useDeleteWishlist();
  const { data: wishlistData } = useFindWishlistAll();
  const findWishlistAll = wishlistData?.payload || [];

  const [isInWishlist, setIsInWishlist] = useState(
    findWishlistAll.some(
      (wishlist: WishlistType) => wishlist.productId === productId
    )
  );

  const handleAddToCart = () => {
    createCart.mutate(1, {
      onSuccess: () => onCartOpen(),
    });
  };

  const handleToggleWishlist = () => {
    const previousState = isInWishlist;
    setIsInWishlist(!isInWishlist);

    if (isInWishlist) {
      deleteWishlist.mutate(productId, {
        onError: () => {
          setIsInWishlist(previousState);
          toast.error("찜 목록에서 제거하는데 실패했습니다.");
        },
        onSuccess: () => {
          toast.success("찜 목록에서 제거되었습니다.");
        },
      });
    } else {
      addWishlist.mutate(productId, {
        onError: () => {
          setIsInWishlist(previousState);
          toast.error("찜 목록에 추가하는데 실패했습니다.");
        },
        onSuccess: () => {
          toast.success("찜 목록에 추가되었습니다.");
        },
      });
    }
  };

  return (
    <div className="flex items-center w-full gap-2">
      <div className="relative group">
        <Button
          variant={"outline"}
          className="relative size-9 flex items-center justify-center"
          onClick={handleToggleWishlist}
        >
          {isInWishlist ? (
            <Icon.heartFilled className="text-rose-500" />
          ) : (
            <>
              <Icon.heart className="absolute inset-0 m-auto group-hover:hidden" />
              <Icon.heartFilled className="absolute inset-0 m-auto hidden group-hover:block text-rose-500" />
            </>
          )}
        </Button>
      </div>
      <div className="flex-1">
        <Button
          variant={"outline"}
          onClick={handleAddToCart}
          className="w-full"
        >
          <Icon.cart /> 장바구니
        </Button>
      </div>
    </div>
  );
}
