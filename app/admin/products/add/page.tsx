"use client";
import ProductForm from "@/components/admin/products/add/product-form";
import { useCreateProduct } from "@/hooks/query/product.queries";
import { ProductFormType } from "@/type/product.type";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AdminAddProductPage() {
  const router = useRouter();
  const createProduct = useCreateProduct();
  function onSubmit(values: ProductFormType) {
    console.log("products add page values", values);
    createProduct.mutate(values, {
      onSuccess: (data) => {
        toast.success(data.message);
        router.push("/admin/products");
      },
      onError: (error) => {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      },
    });
  }
  return (
    <div className="p-6">
      <div className="flex flex-col gap-6">
        <header className="flex items-center justify-between">
          <h1>상품 등록</h1>
        </header>
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
  );
}
