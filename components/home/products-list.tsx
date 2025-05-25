"use client";
import {
  findLatestProductsAll,
  findPopularProductsAll,
} from "@/actions/home.actions";
import { ProductType } from "@/type/product.type";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./product-card";

interface Props {
  queryKey: string[];
}
export default function ProductsList({ queryKey }: Props) {
  const fetchFn = queryKey.includes("latest")
    ? findLatestProductsAll
    : findPopularProductsAll;

  const { data } = useQuery({
    queryKey: queryKey,
    queryFn: fetchFn,
  });
  const products: ProductType[] = data?.body || [];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  );
}
