"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Icon } from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useDeleteCoupons,
  useFindCouponsAll,
} from "@/hooks/query/coupon.queries";
import { useAddCouponStore } from "@/hooks/store/coupon.store";
import { toast } from "sonner";
import { columns } from "./column";

export default function AdminCouponPage() {
  const { onOpen } = useAddCouponStore();
  const { data, isLoading, isError, error } = useFindCouponsAll();
  const deleteCoupons = useDeleteCoupons();
  const CouponList = data?.payload;

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
          <CardTitle className="text-xl line-clamp-1">쿠폰관리</CardTitle>
          <Button
            className="cursor-pointer w-full lg:w-auto"
            size={"sm"}
            onClick={onOpen}
          >
            <Icon.adminAddProduct className="size-4" />
            쿠폰 추가
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            filterKey="code"
            data={CouponList ?? []}
            onDelete={(row) => {
              const ids = row
                .map((r) => r.original.id)
                .filter((id): id is number => id !== undefined);
              deleteCoupons.mutate(ids, {
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
