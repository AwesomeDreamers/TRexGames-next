"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCreateCoupon } from "@/hooks/query/coupon.queries";
import { useAddCouponStore } from "@/hooks/store/coupon.store";
import { CouponFormType } from "@/type/coupon.type";
import { toast } from "sonner";
import CouponForm from "./coupon-form";

export function AddCouponSheet() {
  const { isOpen, onClose } = useAddCouponStore();
  const createCoupon = useCreateCoupon();
  function onSubmit(values: CouponFormType) {
    createCoupon.mutate(values, {
      onSuccess: (data) => {
        toast.success(data.message);
        onClose();
      },
      onError: (error) => {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      },
    });
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className=" lg:max-w-md">
        <div className="p-6">
          <div className="flex flex-col gap-6">
            <SheetHeader className="flex items-center justify-between">
              <SheetTitle>쿠폰 등록</SheetTitle>
            </SheetHeader>
            <CouponForm
              onSubmit={onSubmit}
              // disabled={createProduct.isPending}
              defaultValues={{
                startDate: new Date(),
                endDate: new Date(),
                discount: "0",
                code: "",
                usageLimit: "0",
              }}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
