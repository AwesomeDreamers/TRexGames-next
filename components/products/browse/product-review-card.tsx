import ProductRating from "@/components/ui/product-rating";
import { Separator } from "@/components/ui/separator";
import { noImage } from "@/constants/common";
import { ReviewType } from "@/type/review.type";
import { format } from "date-fns";
import Image from "next/image";

export default function ProductReviewCard({ review }: { review: ReviewType }) {
  return (
    <div className="flex flex-col mt-4">
      <div className="flex gap-1.5 items-center">
        <div className="relative size-12 rounded-full overflow-hidden">
          <Image
            src={review.user.image || noImage}
            alt={review.user.name}
            fill
            className="object-center object-cover"
          />
        </div>
        <div>
          <p className="text-sm">{review.user.name}</p>
          <div className="flex items-center gap-1.5">
            <ProductRating
              readOnly
              value={review.rating}
              className="w-[89px]"
              labelHidden
            />
            <p className="text-xs">{format(review.createdAt, "yyyy.MM.dd")}</p>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-4">{review.product?.name}</p>
      <div className="mt-4 space-y-4">
        <h2 className="text-lg font-bold">{review.title}</h2>
        <div className="whitespace-pre-wrap text-sm">{review.content}</div>
      </div>
      <Separator className="mt-4" />
    </div>
  );
}
