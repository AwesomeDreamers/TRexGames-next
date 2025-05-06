"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  useFindReviewByProductIdAndUserId,
  useUpdateReview,
} from "@/hooks/query/review.queries";
import { useEditReviewStore } from "@/hooks/store/review.store";
import { currencyPrice } from "@/lib/utils";
import { ReviewFormType } from "@/type/review.type";
import { toast } from "sonner";
import ReviewForm from "./review-form";

export function EditReviewSheet() {
  const { isOpen, onClose, productId, id } = useEditReviewStore();

  const updateReview = useUpdateReview(id);
  function onSubmit(values: ReviewFormType) {
    values.productId = productId;
    updateReview.mutate(values, {
      onSuccess: (data) => {
        toast.success(data.message);
        onClose();
      },
      onError: (error) => {
        toast.error("리뷰 등록 실패하였습니다.");
      },
    });
  }
  const { data, isLoading } = useFindReviewByProductIdAndUserId(productId);
  const findReviewByProductIdAndUserId = data?.payload;

  if (!findReviewByProductIdAndUserId || isLoading) return null;

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
                  {findReviewByProductIdAndUserId?.product.category.name} /{" "}
                  {findReviewByProductIdAndUserId?.product.platform.name}
                </p>
                {Number(findReviewByProductIdAndUserId?.product.discount) >
                  0 && (
                  <p className="line-through">
                    {currencyPrice(
                      Number(findReviewByProductIdAndUserId?.product.price),
                      0
                    )}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-md font-bold line-clamp-1">
                  {findReviewByProductIdAndUserId?.product.name}
                </h2>
                <p className="text-md ml-2">
                  {currencyPrice(
                    Number(findReviewByProductIdAndUserId?.product.price),
                    Number(findReviewByProductIdAndUserId?.product.discount)
                  )}
                </p>
              </div>
            </div>
            <ReviewForm
              onSubmit={onSubmit}
              disabled={updateReview.isPending}
              id={id}
              defaultValues={
                {
                  title: findReviewByProductIdAndUserId.title,
                  content: findReviewByProductIdAndUserId.content,
                  rating: findReviewByProductIdAndUserId.rating,
                } as ReviewFormType
              }
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
