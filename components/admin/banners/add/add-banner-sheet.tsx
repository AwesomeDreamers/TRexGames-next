"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCreateBanner } from "@/hooks/query/banner.queries";
import { useAddBannerStore } from "@/hooks/store/banner.store";
import { BannerFormType } from "@/type/banner.type";
import { toast } from "sonner";
import BannerForm from "./banner-form";

export function AddBannerSheet() {
  const { isOpen, onClose } = useAddBannerStore();
  const createBanner = useCreateBanner();
  function onSubmit(values: BannerFormType) {
    createBanner.mutate(values, {
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
      <SheetContent>
        <div className="p-6">
          <div className="flex flex-col gap-6">
            <SheetHeader className="flex items-center justify-between">
              <SheetTitle>배너 등록</SheetTitle>
            </SheetHeader>
            <BannerForm
              onSubmit={onSubmit}
              disabled={createBanner.isPending}
              defaultValues={{
                title: "",
                price: 0,
                url: "",
              }}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
