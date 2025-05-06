"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { categories, platforms } from "@/constants/product.constants";
import { currencyPrice } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FilterSection() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchParamsArr = (key: string): string[] => {
    const param = searchParams.get(key);
    if (param === null) {
      return [];
    }
    return param.split(",").filter((item) => item !== "");
  };

  const currentCategories = searchParamsArr("categories");
  const currentPlatforms = searchParamsArr("platforms");

  const currentMinPrice = parseInt(searchParams.get("minPrice") || "0", 10);
  const currentMaxPrice = parseInt(
    searchParams.get("maxPrice") || "100000",
    10
  );
  const currentName = searchParams.get("name") || "";

  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>([
    currentMinPrice,
    currentMaxPrice,
  ]);

  useEffect(() => {
    setLocalPriceRange([currentMinPrice, currentMaxPrice]);
  }, [currentMinPrice, currentMaxPrice]);

  const handleToggleFilter = (
    filterType: "categories" | "platforms",
    value: string
  ) => {
    const currentItems =
      filterType === "categories" ? currentCategories : currentPlatforms;

    const newItems = currentItems.includes(value)
      ? currentItems.filter((item) => item !== value)
      : [...currentItems, value];

    const params = new URLSearchParams(searchParams.toString());

    if (newItems.length > 0) {
      params.set(filterType, newItems.join(","));
    } else {
      params.delete(filterType);
    }
    params.set("page", "1");

    router.push(`/browse?${params.toString()}`);
  };

  const handlePriceRangeCommit = (value: [number, number]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("minPrice", value[0].toString());
    params.set("maxPrice", value[1].toString());
    params.set("page", "1");

    router.push(`/browse?${params.toString()}`);
  };

  const defaultPriceRange: [number, number] = [0, 100000];

  const resetFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("categories");
    params.delete("platforms");
    if (
      currentMinPrice !== defaultPriceRange[0] ||
      currentMaxPrice !== defaultPriceRange[1]
    ) {
      params.delete("minPrice");
      params.delete("maxPrice");
    }
    params.delete("name");
    params.set("page", "1");

    router.push(`/browse?${params.toString()}`);
    setLocalPriceRange(defaultPriceRange);
  };

  const isFilterChanged =
    currentCategories.length > 0 ||
    currentPlatforms.length > 0 ||
    currentMinPrice !== defaultPriceRange[0] ||
    currentMaxPrice !== defaultPriceRange[1] ||
    currentName !== "";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="mb-3 font-semibold">필터</h3>
        {isFilterChanged && (
          <Button variant="outline" onClick={resetFilters}>
            초기화
          </Button>
        )}
      </div>
      <div>
        <h3 className="mb-3 font-semibold">카테고리</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.name} className="flex items-center">
              <Checkbox
                id={category.name}
                checked={currentCategories?.includes(category.name)}
                onCheckedChange={() =>
                  handleToggleFilter("categories", category.name)
                }
              />
              <Label htmlFor={category.name} className="ml-2 text-sm">
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <h3 className="mb-3 font-semibold">플랫폼</h3>
      <div className="space-y-2">
        {platforms.map((platform) => (
          <div key={platform.name} className="flex items-center">
            <Checkbox
              id={platform.name}
              checked={currentPlatforms?.includes(platform.name)}
              onCheckedChange={() =>
                handleToggleFilter("platforms", platform.name)
              }
            />
            <Label htmlFor={platform.name} className="ml-2 text-sm">
              {platform.name}
            </Label>
          </div>
        ))}
      </div>
      <div>
        <h3 className="mb-3 font-semibold">가격 범위</h3>
        <Slider
          value={localPriceRange}
          onValueChange={(value) =>
            setLocalPriceRange([value[0], value[1]] as [number, number])
          }
          onValueCommit={(value) =>
            handlePriceRangeCommit([value[0], value[1]] as [number, number])
          }
          max={100000}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between mt-2 text-sm">
          <span>{currencyPrice(localPriceRange[0], 0)}</span>{" "}
          <span>{currencyPrice(localPriceRange[1], 0)}</span>
        </div>
      </div>
    </div>
  );
}
