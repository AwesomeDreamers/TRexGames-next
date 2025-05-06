"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useFindProductById } from "@/hooks/query/product.queries";
import { useCreateReview } from "@/hooks/query/review.queries";
import { useCreateReviewStore } from "@/hooks/store/review.store";
import { currencyPrice } from "@/lib/utils";
import { ReviewFormType } from "@/type/review.type";
import { toast } from "sonner";
import ReviewForm from "./review-form";

export function AddReviewSheet() {
  const { isOpen, onClose, productId } = useCreateReviewStore();
  const createReview = useCreateReview();
  function onSubmit(values: ReviewFormType) {
    values.productId = productId;
    createReview.mutate(values, {
      onSuccess: (data) => {
        toast.success(data.message);
        onClose();
      },
      onError: () => {
        toast.error("리뷰 등록 실패하였습니다.");
      },
    });
  }
  const { data: product, isLoading } = useFindProductById(productId);
  if (isLoading) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <div className="p-6">
          <div className="flex flex-col gap-6">
            <SheetHeader className="flex items-center justify-between">
              <SheetTitle>리뷰 등록</SheetTitle>
            </SheetHeader>
            <div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <p>
                  {product?.category.name} / {product?.platform.name}
                </p>
                {Number(product?.discount) > 0 && (
                  <p className="line-through">
                    {currencyPrice(Number(product?.price), 0)}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-md font-bold line-clamp-1">
                  {product?.name}
                </h2>
                <p className="text-md ml-2">
                  {currencyPrice(
                    Number(product?.price),
                    Number(product?.discount)
                  )}
                </p>
              </div>
            </div>
            <ReviewForm
              onSubmit={onSubmit}
              disabled={createReview.isPending}
              defaultValues={
                {
                  title: "",
                  content: "",
                  rating: 0,
                } as ReviewFormType
              }
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
