"use client";
import { useCreateCart } from "@/hooks/query/cart.queires";
import { useDeleteWishlist } from "@/hooks/query/wishlist.queries";
import { useConfirm } from "@/hooks/use-confirm";
import { currencyPrice } from "@/lib/utils";
import { WishlistType } from "@/type/wishlist.type";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { TableCell, TableRow } from "../ui/table";

export default function WishlistTableRow({ item }: { item: WishlistType }) {
  const [ConfirmDialog, confirm] = useConfirm(
    "정말로 장바구니로 이동하시겠습니까?",
    "장바구니로 이동된 후 찜 목록에서 삭제됩니다."
  );
  const createCart = useCreateCart(item.productId);
  const deleteWishlist = useDeleteWishlist();

  const handleAddToCart = async () => {
    const ok = await confirm();
    if (ok) {
      toast.success("장바구니로 이동되었습니다.");
      createCart.mutate(1);
      deleteWishlist.mutate(item.productId);
    }
  };

  const handleDeleteWishlist = () => {
    deleteWishlist.mutate(item.productId, {
      onSuccess: () => {
        toast.success("찜 목록에서 삭제되었습니다.");
      },
      onError: () => {
        toast.error("찜 목록에서 삭제하는데 실패했습니다.");
      },
    });
  };
  return (
    <>
      <ConfirmDialog />
      <TableRow key={item.productId}>
        <TableCell>
          <Link
            href={`/browse/${item.productId}/${item.product.slug}`}
            className="flex items-center"
          >
            <Image
              src={item.product.images[0].url}
              alt={item.product.name}
              width={50}
              height={50}
            />
            <span className="px-2">{item.product.name}</span>
          </Link>
        </TableCell>
        <TableCell className="text-right hidden md:table-cell">
          {item.product.category.name} / {item.product.platform.name}
        </TableCell>
        <TableCell className="text-right hidden md:table-cell">
          {currencyPrice(
            Number(item.product.price),
            Number(item.product.discount)
          )}
        </TableCell>
        <TableCell className="text-right hidden md:table-cell">
          {item.product.rating}
        </TableCell>
        <TableCell className="text-right">
          <Button variant="ghost" onClick={handleAddToCart}>
            <Icon.cart />
          </Button>
          <Button variant="ghost" onClick={handleDeleteWishlist}>
            <Icon.trash />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}
