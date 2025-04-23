"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Icon } from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useDeleteProducts,
  useFindProductsAll,
} from "@/hooks/query/product.queries";
import { useAddProductStore } from "@/hooks/store/product.store";
import { toast } from "sonner";
import { columns } from "./column";

export default function AdminProductPage() {
  const { onOpen } = useAddProductStore();
  const { data, isLoading, isError, error } = useFindProductsAll();
  const deleteProducts = useDeleteProducts();
  const ProductList = data?.payload;

  if (isError) {
    toast.error(error.message);
  }

  if (isLoading) {
    return (
      <div className="max-w-screen mx-auto w-full pb-10">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <Skeleton className="h-8 w-20" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Icon.loading className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen mx-auto w-full pb-10">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">상품관리</CardTitle>
          <Button
            className="cursor-pointer w-full lg:w-auto"
            size={"sm"}
            onClick={onOpen}
          >
            <Icon.adminAddProduct className="size-4" />
            상품 추가
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            filterKey="name"
            data={ProductList ?? []}
            onDelete={(row) => {
              const ids = row
                .map((r) => r.original.id)
                .filter((id): id is number => id !== undefined);
              deleteProducts.mutate(ids, {
                onSuccess: (data) => {
                  toast.success(data?.message);
                },
              });
            }}
            disabled={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}
