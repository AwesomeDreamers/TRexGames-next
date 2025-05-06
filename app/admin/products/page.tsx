import { findProductsAll } from "@/actions/product.actions";
import AddButton from "@/components/admin/add-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getQueryClient } from "@/provider/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import ProductsList from "./products-list";

interface Props {
  searchParams: {
    category?: string | string[];
    platform?: string | string[];
    minPrice?: string;
    maxPrice?: string;
    sortBy?: string;
    sortOrder?: string;
    page?: string;
    name?: string;
    [key: string]: string | string[] | undefined;
  };
}

export default async function AdminProductPage({ searchParams }: Props) {
  const params = await searchParams;
  const category = Array.isArray(params.category)
    ? params.category
    : params.category?.split(",") || [];
  const platform = Array.isArray(params.platform)
    ? params.platform
    : params.platform?.split(",") || [];
  const page = parseInt((params.page as string) || "1", 10);
  const take = parseInt((params.take as string) || "10", 10);
  const name = (params.name as string) || "";

  const filterOptions = {
    categories: Array.isArray(category) ? category : [],
    platforms: Array.isArray(platform) ? platform : [],
    page,
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
    <div className="max-w-screen mx-auto w-full pb-10">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">상품관리</CardTitle>
          <AddButton label="상품 추가" action="productOpen" />
        </CardHeader>
        <CardContent>
          <HydrationBoundary state={state}>
            <ProductsList params={filterOptions} page={page} take={take} />
          </HydrationBoundary>
        </CardContent>
      </Card>
    </div>
  );
}
