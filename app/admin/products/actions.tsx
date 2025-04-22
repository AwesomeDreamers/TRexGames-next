"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";
import { useDeleteProduct } from "@/hooks/query/product.queries";
import { useOpenProductStore } from "@/hooks/store/product.store";
import { useConfirm } from "@/hooks/use-confirm";

type Props = {
  id: number;
};

export default function Actions({ id }: Props) {
  const { onOpen } = useOpenProductStore();
  const deleteProduct = useDeleteProduct(id);
  const [ConfirmDialog, confirm] = useConfirm(
    "정말로 삭제하시겠습니까?",
    "삭제된 데이터는 복구할 수 없습니다."
  );

  const handleDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteProduct.mutate();
    }
  };
  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="size-8 p-0 cursor-pointer">
            <Icon.moreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={deleteProduct.isPending}
            onClick={() => onOpen(id)}
            className="cursor-pointer"
          >
            <Icon.edit className="size-4" /> 수정
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={deleteProduct.isPending}
            onClick={handleDelete}
            className="cursor-pointer"
          >
            <Icon.trash className="size-4" /> 삭제
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
