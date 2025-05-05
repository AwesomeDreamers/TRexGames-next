"use client";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useCreateCart, useFindCartsAll } from "@/hooks/query/cart.queires";
import {
  useAddWishlist,
  useDeleteWishlist,
  useFindWishlistAll,
} from "@/hooks/query/wishlist.queries";
import { useCartStore } from "@/hooks/store/user.store";
import { CartType } from "@/type/cart.type";
import { WishlistType } from "@/type/wishlist.type";
import { toast } from "sonner";

export default function CartWishlistButton({
  productId,
}: {
  productId: number;
}) {
  const { onCartOpen } = useCartStore();
  const createCart = useCreateCart(productId);
  const addWishlist = useAddWishlist(productId);
  const deleteWishlist = useDeleteWishlist(productId);
  const { data: cartData, isLoading: cartIsLoading } = useFindCartsAll();
  const { data: wishlistData, isLoading: wishlistIsLoading } =
    useFindWishlistAll();
  const findCartsAll = cartData?.payload || [];
  const findWishlistAll = wishlistData?.payload || [];

  if (cartIsLoading || wishlistIsLoading) null;

  // console.log("findCartsAll", findCartsAll);
  // console.log("findWishlistAll", findWishlistAll);

  const handleAddToCart = () => {
    createCart.mutate(1, {
      onSuccess: () => {
        if (
          findCartsAll.some((cart: CartType) => cart.productId === productId)
        ) {
          toast.success("이미 장바구니에 담긴 상품입니다.");
        } else {
          toast.success("장바구니에 추가되었습니다.");
        }
        onCartOpen();
      },
      onError: () => {
        toast.error("장바구니에 추가하는데 실패했습니다.");
      },
    });
  };

  const handleToggleWishlist = () => {
    const isInWishlist = findWishlistAll.some(
      (wishlist: WishlistType) => wishlist.productId === productId
    );

    if (isInWishlist) {
      deleteWishlist.mutate(undefined, {
        onSuccess: () => {
          toast.success("찜 목록에서 제거되었습니다.");
        },
        onError: () => {
          toast.error("찜 목록에서 제거하는데 실패했습니다.");
        },
      });
    } else {
      addWishlist.mutate(undefined, {
        onSuccess: () => {
          toast.success("찜 목록에 추가되었습니다.");
        },
        onError: () => {
          toast.error("찜 목록에 추가하는데 실패했습니다.");
        },
      });
    }
  };

  const isInWishlist = findWishlistAll.some(
    (wishlist: WishlistType) => wishlist.productId === productId
  );

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
