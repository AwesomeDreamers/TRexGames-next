"use client";
import FilterSection from "@/components/products/browse/filter-section";
import ProductList from "@/components/products/browse/product-list";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useFilterStore,
  useOpenFilterStore,
} from "@/hooks/store/product.store";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const gameBanner = "/images/game-banner.jpg";

export default function ProductListPage() {
  const {
    currentPage,
    selectedCategories,
    selectedPlatforms,
    priceRange,
    setSelectedCategories,
    setSelectedPlatforms,
    setPriceRange,
    setCurrentPage,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    setName,
    name,
  } = useFilterStore();

  const { onOpen } = useOpenFilterStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const categories = searchParams.get("categories")?.split(",") || [];
    const platforms = searchParams.get("platforms")?.split(",") || [];
    const minPrice = parseInt(searchParams.get("minPrice") || "0", 10);
    const maxPrice = parseInt(searchParams.get("maxPrice") || "100000", 10);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    const name = searchParams.get("name") || "";

    setSelectedCategories(categories);
    setSelectedPlatforms(platforms);
    setPriceRange([minPrice, maxPrice]);
    setCurrentPage(page);
    setSortBy(sortBy);
    setSortOrder(sortOrder as "asc" | "desc");
    setName(name);
  }, [searchParams]);

  const updateURL = () => {
    const params = new URLSearchParams();

    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","));
    }
    if (selectedPlatforms.length > 0) {
      params.set("platforms", selectedPlatforms.join(","));
    }
    if (priceRange[0] !== 0 || priceRange[1] !== 100000) {
      params.set("minPrice", priceRange[0].toString());
      params.set("maxPrice", priceRange[1].toString());
    }
    if (sortBy !== "createdAt" || sortOrder !== "desc") {
      params.set("sortBy", sortBy);
      params.set("sortOrder", sortOrder);
    }
    if (name) {
      params.set("name", name);
    }

    params.set("page", currentPage.toString());

    router.push(`/browse?${params.toString()}`);
  };

  useEffect(() => {
    updateURL();
  }, [
    selectedCategories,
    selectedPlatforms,
    priceRange,
    currentPage,
    sortBy,
    sortOrder,
    name,
  ]);

  const handleSortChange = (value: string) => {
    const [newSortBy, newSortOrder] = value.split("-");
    setSortBy(newSortBy);
    setSortOrder(newSortOrder as "asc" | "desc");
    updateURL();
  };
  return (
    <div className="min-h-screen">
      <div className="relative h-[300px] overflow-hidden">
        <Image
          src={gameBanner}
          alt="Elder Scrolls IV: Oblivion"
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">게임목록</h2>
          <div className="flex items-center gap-4">
            <Button variant={"outline"} className="lg:hidden" onClick={onOpen}>
              <Icon.filter className="h-4 w-4 mr-2" />
              필터
            </Button>
            <Select
              value={`${sortBy}-${sortOrder}`}
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
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="hidden lg:block w-64 shrink-0">
            <FilterSection />
          </div>

          <div className="flex-1">
            <ProductList />
          </div>
        </div>
      </div>
    </div>
  );
}
