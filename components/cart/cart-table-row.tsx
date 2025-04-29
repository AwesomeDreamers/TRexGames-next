"use client";
import { useDeleteCart } from "@/hooks/query/cart.queires";
import { useAddWishlist } from "@/hooks/query/wishlist.queries";
import { useConfirm } from "@/hooks/use-confirm";
import { currencyPrice } from "@/lib/utils";
import { CartItemType } from "@/type/cart.type";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import QtyButton from "../ui/qty-button";
import { TableCell, TableRow } from "../ui/table";

export default function CartTableRow({ item }: { item: CartItemType }) {
  const addWishlist = useAddWishlist(item.productId);
  const deleteCartItem = useDeleteCart(item.productId);

  const [ConfirmDialog, confirm] = useConfirm(
    "정말로 찜목록으로 이동하시겠습니까?",
    "찜목록으로 이동된 후 장바구니에서 삭제됩니다."
  );

  const handleAddToWishlist = async () => {
    const ok = await confirm();
    if (ok) {
      toast.success("찜목록으로 이동되었습니다.");
      addWishlist.mutate();
      deleteCartItem.mutate();
    }
  };

  return (
    <>
      <ConfirmDialog />
      <TableRow key={item.id}>
        <TableCell>
          <Link href={`/browse/${item.id}`} className="flex items-center">
            <Image src={item.image} alt={item.name} width={50} height={50} />
            <span className="px-2">{item.name}</span>
          </Link>
        </TableCell>
        <TableCell className="gap-2">
          <div className="flex items-center justify-center">
            <QtyButton item={item} />
          </div>
        </TableCell>
        <TableCell className="text-right">
          {currencyPrice(item.price * item.quantity, item.discount)}
        </TableCell>
        <TableCell className="text-right">
          <Button variant="ghost" onClick={handleAddToWishlist}>
            <Icon.heart />
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              deleteCartItem.mutate(undefined, {
                onSuccess: () => {
                  toast.success("장바구니에서 삭제되었습니다.");
                },
                onError: () => {
                  toast.error("장바구니에서 삭제하는데 실패했습니다.");
                },
              });
            }}
          >
            <Icon.trash />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}
