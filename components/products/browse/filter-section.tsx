import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { categories, platforms } from "@/constants/product.contstant";
import { useFilterStore } from "@/hooks/store/product.store";
import { currencyPrice } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function FilterSection() {
  const {
    selectedCategories,
    selectedPlatforms,
    setSelectedCategories,
    setSelectedPlatforms,
    priceRange,
    setPriceRange,
  } = useFilterStore();

  const [localPriceRange, setLocalPriceRange] =
    useState<[number, number]>(priceRange);

  useEffect(() => {
    setLocalPriceRange(priceRange);
  }, [priceRange]);

  const handleToggleFilter = (
    filterType: "categories" | "platforms",
    value: string
  ) => {
    const setterMap = {
      categories: setSelectedCategories,
      platforms: setSelectedPlatforms,
    };

    const currentState =
      filterType === "categories" ? selectedCategories : selectedPlatforms;

    const newState = currentState.includes(value)
      ? currentState.filter((item) => item !== value)
      : [...currentState, value];

    setterMap[filterType](newState);
  };

  const defaultCategories: string[] = [];
  const defaultPlatforms: string[] = [];
  const defaultPriceRange: [number, number] = [0, 100000];

  const resetFilters = () => {
    setSelectedCategories(defaultCategories);
    setSelectedPlatforms(defaultPlatforms);
    setPriceRange(defaultPriceRange);
    setLocalPriceRange(defaultPriceRange);
  };

  const isFilterChanged =
    selectedCategories.length > 0 ||
    selectedPlatforms.length > 0 ||
    priceRange[0] !== defaultPriceRange[0] ||
    priceRange[1] !== defaultPriceRange[1];

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
                checked={selectedCategories.includes(category.name)}
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
              checked={selectedPlatforms.includes(platform.name)}
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
            setPriceRange([value[0], value[1]] as [number, number])
          }
          max={100000}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between mt-2 text-sm">
          <span>{currencyPrice(localPriceRange[0], 0)}</span>
          <span>{currencyPrice(localPriceRange[1], 0)}</span>
        </div>
      </div>
    </div>
  );
}
