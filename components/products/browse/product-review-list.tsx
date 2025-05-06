import { Icon } from "@/components/ui/icon";
import { PaginationWithLinks } from "@/components/ui/pagenation-with-links";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFindReviewsByProductId } from "@/hooks/query/review.queries";
import { useReviewFilterStore } from "@/hooks/store/review.store";
import { ReviewType } from "@/type/review.type";
import ProductReviewCard from "./product-review-card";

interface Props {
  productId: number;
}

export default function ProductReviewList({ productId }: Props) {
  const { sortBy, sortOrder, setSortBy, setSortOrder } = useReviewFilterStore();
  const { data, isLoading } = useFindReviewsByProductId(productId);
  const findReviewsByProductId = data?.payload.reviews || [];
  const page = data?.payload.page;
  const take = data?.payload.take;
  const totalCount = data?.payload.totalCount;
  if (isLoading)
    return (
      <span className="animate-spin w-full flex justify-center items-center min-h-40">
        <Icon.loading />
      </span>
    );

  const handleSortChange = (value: string) => {
    const [newSortBy, newSortOrder] = value.split("-");
    setSortBy(newSortBy);
    setSortOrder(newSortOrder as "asc" | "desc");
  };
  return (
    <div className="space-y-4 w-full">
      <div
        className="font-semibold mb-5"
        style={{
          backgroundImage:
            "url(https://store.fastly.steamstatic.com/public/images/v6/maincol_gradient_rule.png)",
          lineHeight: "26px",
          backgroundPosition: "bottom left",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex justify-between items-center">
          <p>리뷰</p>
          <Select
            value={`${sortBy}-${sortOrder}`}
            onValueChange={(value) => handleSortChange(value)}
            name="sort"
          >
            <SelectTrigger className="cursor-pointer">
              <SelectValue placeholder="정렬 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt-desc" className="cursor-pointer">
                최신 순
              </SelectItem>
              <SelectItem value="createdAt-asc" className="cursor-pointer">
                오래된 순
              </SelectItem>
              <SelectItem value="rating-asc" className="cursor-pointer">
                평점낮은 순
              </SelectItem>
              <SelectItem value="rating-desc" className="cursor-pointer">
                평점높은 순
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mb-5 w-full min-h-40">
        {isLoading ? (
          <span className="animate-spin">
            <Icon.loading />
          </span>
        ) : findReviewsByProductId.length === 0 ? (
          <p className="text-center text-sm text-gray-500">
            작성된 리뷰가 없습니다.
          </p>
        ) : (
          findReviewsByProductId.map((review: ReviewType) => (
            <ProductReviewCard key={review.id} review={review} />
          ))
        )}
      </div>
      {findReviewsByProductId.length !== 0 && (
        <PaginationWithLinks page={page} take={take} totalCount={totalCount} />
      )}
    </div>
  );
}
