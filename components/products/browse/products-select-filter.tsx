"use client";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOpenFilterStore } from "@/hooks/store/product.store";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  sortBy: string;
  sortOrder: "asc" | "desc";
}

export default function ProductsSelectFilter({ sortBy, sortOrder }: Props) {
  const { onOpen } = useOpenFilterStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = `${sortBy}-${sortOrder}`;

  const handleSortChange = (value: string) => {
    const [newSortBy, newSortOrder] = value.split("-");

    const currentParams = new URLSearchParams(searchParams.toString());

    currentParams.set("sortBy", newSortBy);
    currentParams.set("sortOrder", newSortOrder);

    currentParams.set("page", "1");

    router.push(`/browse?${currentParams.toString()}`);
  };

  return (
    <div className="flex items-center gap-4">
      <Button variant={"outline"} className="lg:hidden" onClick={onOpen}>
        <Icon.filter className="h-4 w-4 mr-2" />
        필터
      </Button>
      <Select
        value={currentSort}
        onValueChange={(value) => handleSortChange(value)}
        name="sort"
      >
        <SelectTrigger className="w-full cursor-pointer">
          <SelectValue placeholder="정렬 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="createdAt-desc" className="cursor-pointer">
            최신 순
          </SelectItem>
          <SelectItem value="createdAt-asc" className="cursor-pointer">
            오래된 순
          </SelectItem>
          <SelectItem value="price-asc" className="cursor-pointer">
            가격낮은 순
          </SelectItem>
          <SelectItem value="price-desc" className="cursor-pointer">
            가격높은 순
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
  );
}
