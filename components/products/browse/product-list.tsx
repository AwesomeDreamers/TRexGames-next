"use client";
import { PaginationWithLinks } from "@/components/ui/pagenation-with-links";
import { useFindProductsAll } from "@/hooks/query/product.queries";
import { useFindWishlistAll } from "@/hooks/query/wishlist.queries";
import { ProductFilterType, ProductType } from "@/type/product.type";
import ProductCard from "./product-card";
import ProductCardSkeleton from "./product-card-skeleton";

interface Props {
  page: number;
  take: number;
  params: ProductFilterType;
}

export default function ProductList({ page, take, params }: Props) {
  const { data } = useFindProductsAll(params);
  const products: ProductType[] = data?.payload.products || [];
  const totalCount: number = data?.payload.totalCount || 0;
  const { isLoading: wishlistIsLoading } = useFindWishlistAll();

  if (wishlistIsLoading)
    return (
      <div>
        <div className="grid place-items-center grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  return (
    <div>
      <div className="grid place-items-center grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div>데이터가 없어요...</div>
        )}
      </div>
      <div className="mt-5">
        <PaginationWithLinks page={page} take={take} totalCount={totalCount} />
      </div>
    </div>
  );
}
