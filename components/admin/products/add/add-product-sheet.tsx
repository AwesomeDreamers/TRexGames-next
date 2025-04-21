"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCreateProduct } from "@/hooks/query/product.queries";
import { useAddProductStore } from "@/hooks/store/product.store";
import { ProductFormType } from "@/type/product.type";
import { toast } from "sonner";
import ProductForm from "./product-form";

export function AddProductSheet() {
  const createProduct = useCreateProduct();
  const { isOpen, onClose } = useAddProductStore();
  function onSubmit(values: ProductFormType) {
    console.log("products add page values", values);
    createProduct.mutate(values, {
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
      <SheetContent className="">
        <div className="p-6">
          <div className="flex flex-col gap-6">
            <SheetHeader className="flex items-center justify-between">
              <SheetTitle>상품 등록</SheetTitle>
            </SheetHeader>
            <ProductForm
              onSubmit={onSubmit}
              disabled={createProduct.isPending}
              defaultValues={
                {
                  name: "",
                  slug: "",
                  description: "",
                  price: "0",
                  platformId: "0",
                  categoryId: "0",
                  discount: "0",
                  minSpec: {
                    cpu: "",
                    gpu: "",
                    ram: "",
                    storage: "",
                    directX: "",
                    os: "",
                  },
                  recSpec: {
                    cpu: "",
                    gpu: "",
                    ram: "",
                    storage: "",
                    directX: "",
                    os: "",
                  },
                } as ProductFormType
              }
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
