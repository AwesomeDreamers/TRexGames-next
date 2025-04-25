import { PaginationWithLinks } from "@/components/ui/pagenation-with-links";
import { Skeleton } from "@/components/ui/skeleton";
import { useClientProducts } from "@/hooks/query/product.queries";
import { ProductType } from "@/type/product.type";
import { toast } from "sonner";
import ProductCard from "./product-card";

export default function ProductList() {
  const { data, isLoading, isError, error } = useClientProducts();

  if (isLoading)
    return (
      <div className="grid place-items-center grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  if (isError) return toast.error((error as Error).message);
  const totalCount = data.payload.total;
  const take = data.payload.limit;
  const page = data.payload.page;
  const products: ProductType[] = data?.payload.products;

  console.log("data", data.payload.limit);

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

function ProductSkeleton() {
  return (
    <div className=" max-w-3xs md:max-w-sm rounded relative w-full">
      <Skeleton className="relative w-full h-[46vh]" />
      <div className="py-4 flex flex-col gap-3">
        <div className="flex justify-between items-center gap-1">
          <Skeleton className="w-full" />
          <div className="py-1 px-2 rounded-sm">
            <Skeleton className="w-6.5" />
          </div>
        </div>
        <div className="flex gap-4 items-center justify-between">
          <div className="flex flex-row gap-2 items-center">
            <Skeleton className="w-20" />
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Skeleton className="w-5" />
            <Skeleton className="w-10" />
            <Skeleton className="w-5" />
            <Skeleton className="w-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
