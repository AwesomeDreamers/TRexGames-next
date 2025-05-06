import { useFindReviewByProductIdAndUserId } from "@/hooks/query/review.queries";
import {
  useCreateReviewStore,
  useEditReviewStore,
} from "@/hooks/store/review.store";
import { currencyPrice } from "@/lib/utils";
import { OrderItemType } from "@/type/order.type";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function OrderCard({ item }: { item: OrderItemType }) {
  const { data, isLoading } = useFindReviewByProductIdAndUserId(item.productId);
  const findReviewByProductIdAndUserId = data?.payload || null;
  const { onOpen: createReviewOpen } = useCreateReviewStore();
  const { onOpen: editReviewOpen } = useEditReviewStore();
  if (isLoading) return null;

  return (
    <div key={item.productId} className="p-2">
      <div className="flex items-center justify-between gap-2 w-full">
        <div className="relative w-24 h-32 rounded-md overflow-hidden">
          <Image
            src={item.productImage}
            alt={item.productName}
            fill
            className="object-cover object-center"
          />
          {item.discount > 0 && (
            <Badge className="absolute top-1 left-1 bg-blue-400 text-white text-[9px]">
              {item.discount}%
            </Badge>
          )}
        </div>
        <div className="flex flex-col w-[75%]">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <p>
              {item.productCategory} / {item.productPlatform}
            </p>
            {item.discount > 0 && (
              <p className="line-through">{currencyPrice(item.price, 0)}</p>
            )}
          </div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-md font-bold line-clamp-1">
              {item.productName}
            </h2>
            <p className="text-md ml-2">
              {currencyPrice(item.price, item.discount)}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Input
              className="text-gray-500 text-xs text-center"
              defaultValue={item.productKey}
              readOnly
            />

            {findReviewByProductIdAndUserId ? (
              <div className="flex items-center justify-between gap-x-2">
                <Button
                  variant={"outline"}
                  size={"sm"}
                  className="flex-1"
                  onClick={() =>
                    editReviewOpen(
                      item.productId,
                      findReviewByProductIdAndUserId.id
                    )
                  }
                >
                  리뷰 수정
                </Button>
                <Button
                  variant={"outline"}
                  size={"sm"}
                  className="flex-1"
                  onClick={() =>
                    editReviewOpen(
                      item.productId,
                      findReviewByProductIdAndUserId.id
                    )
                  }
                >
                  리뷰 삭제
                </Button>
              </div>
            ) : (
              <Button
                variant={"outline"}
                size={"sm"}
                className="w-full"
                onClick={() => createReviewOpen(item.productId)}
              >
                리뷰 작성
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
