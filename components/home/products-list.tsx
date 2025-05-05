"use client";
import {
  findLatestProductsAll,
  findPopularProductsAll,
} from "@/actions/home.actions";
import { ProductType } from "@/type/product.type";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./product-card";

interface Props {
  queryKey: string[]; // Server Component에서 넘겨받은 쿼리 키
}

export default function ProductsList({ queryKey }: Props) {
  const fetchFn = queryKey.includes("latest")
    ? findLatestProductsAll
    : findPopularProductsAll;

  // ✨ useQuery로 데이터 사용! queryKey가 Server Component에서 prefetch한 것과 같음!
  //    캐시에 데이터가 있으므로 (staleTime 유효 시) 네트워크 요청 없이 바로 가져옴!
  const { data, isLoading, error } = useQuery({
    queryKey: queryKey, // Server Component에서 받아온 키 사용!
    queryFn: fetchFn, // 해당 쿼리 키에 맞는 fetch 함수
  });
  const products: ProductType[] = data?.payload || [];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  );
}
