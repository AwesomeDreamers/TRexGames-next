import { findProductsAll } from "@/actions/product.actions";
import FilterSection from "@/components/products/browse/filter-section";
import ProductList from "@/components/products/browse/product-list";
import ProductsSelectFilter from "@/components/products/browse/products-select-filter";
import { getQueryClient } from "@/provider/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface Props {
  searchParams: {
    categories?: string | string[];
    platforms?: string | string[];
    minPrice?: string;
    maxPrice?: string;
    sortBy?: string;
    sortOrder?: string;
    page?: string;
    name?: string;
    [key: string]: string | string[] | undefined;
  };
}

export default async function BrowsePage({ searchParams }: Props) {
  const params = await searchParams;
  const categories = Array.isArray(params.categories)
    ? params.categories
    : params.categories?.split(",") || [];
  const platforms = Array.isArray(params.platforms)
    ? params.platforms
    : params.platforms?.split(",") || [];
  const minPrice = parseInt((params.minPrice as string) || "0", 10);
  const maxPrice = parseInt((params.maxPrice as string) || "100000", 10);
  const page = parseInt((params.page as string) || "1", 10);
  const take = parseInt((params.take as string) || "8", 10);
  const sortBy = (params.sortBy as string) || "createdAt";
  const sortOrder = (params.sortOrder as "asc" | "desc") || "desc";
  const name = (params.name as string) || "";

  const filterOptions = {
    categories,
    platforms,
    minPrice,
    maxPrice,
    page,
    sortBy,
    sortOrder,
    name,
    take,
  };

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["products", filterOptions],
    queryFn: () => findProductsAll(filterOptions),
  });
  const state = dehydrate(queryClient);

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">게임목록</h2>
          <ProductsSelectFilter sortBy={sortBy} sortOrder={sortOrder} />
        </div>
        <div className="flex gap-8">
          <div className="hidden lg:block w-64 shrink-0">
            <FilterSection />
          </div>

          <div className="flex-1">
            <HydrationBoundary state={state}>
              <ProductList params={filterOptions} page={page} take={take} />
            </HydrationBoundary>
          </div>
        </div>
      </div>
    </div>
  );
}
