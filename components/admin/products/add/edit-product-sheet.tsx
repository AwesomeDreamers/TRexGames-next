"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  useFindProductById,
  useUpdateProduct,
} from "@/hooks/query/product.queries";
import { useOpenProductStore } from "@/hooks/store/product.store";
import { ProductFormType, ProductImageType } from "@/type/product.type";
import { toast } from "sonner";
import ProductForm from "./product-form";

export function EditProductSheet() {
  const { isOpen, onClose, id } = useOpenProductStore();
  const updateProduct = useUpdateProduct(id);
  const findProductById = useFindProductById(id);

  function onSubmit(values: ProductFormType) {
    updateProduct.mutate(values, {
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

  const minSpec = {
    cpu: findProductById.data?.specs[0].cpu ?? "",
    gpu: findProductById.data?.specs[0].gpu ?? "",
    ram: findProductById.data?.specs[0]?.ram ?? "",
    storage: findProductById.data?.specs[0]?.storage ?? "",
    directX: findProductById.data?.specs[0]?.directX ?? "",
    os: findProductById.data?.specs[0]?.os ?? "",
  };

  const recSpec = {
    cpu: findProductById.data?.specs[1]?.cpu ?? "",
    gpu: findProductById.data?.specs[1]?.gpu ?? "",
    ram: findProductById.data?.specs[1]?.ram ?? "",
    storage: findProductById.data?.specs[1]?.storage ?? "",
    directX: findProductById.data?.specs[1]?.directX ?? "",
    os: findProductById.data?.specs[1]?.os ?? "",
  };

  const defaultValues = findProductById.data
    ? {
        ...findProductById.data,
        images: findProductById.data.images.map(
          (image: ProductImageType) => image.url
        ),
        minSpec,
        recSpec,
      }
    : {
        name: "",
        slug: "",
        description: "",
        price: 0,
        platformId: "",
        categoryId: "",
        discount: 0,
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
      };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <div className="p-6">
          <div className="flex flex-col gap-6">
            <SheetHeader className="flex items-center justify-between">
              <SheetTitle>상품 수정</SheetTitle>
            </SheetHeader>
            {findProductById.isLoading ? null : (
              <ProductForm
                id={id}
                onSubmit={onSubmit}
                disabled={updateProduct.isPending}
                defaultValues={defaultValues}
              />
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
