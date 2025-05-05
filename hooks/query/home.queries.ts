import {
  findLatestProductsAll,
  findPopularProductsAll,
  findSwiperBannersAll,
} from "@/actions/home.actions";
import { useQuery } from "@tanstack/react-query";

export function useFindSwiperBannersAll() {
  const query = useQuery({
    queryKey: ["banners"],
    queryFn: findSwiperBannersAll,
    staleTime: 1000 * 60 * 60 * 5,
  });
  return query;
}

export function useFindLatestProductsAll() {
  const query = useQuery({
    queryKey: ["products", "latest"],
    queryFn: findLatestProductsAll,
    staleTime: 1000 * 60 * 60 * 5,
  });
  return query;
}

export function useFindPopularProductsAll() {
  const query = useQuery({
    queryKey: ["products", "popular"],
    queryFn: findPopularProductsAll,
    staleTime: 1000 * 60 * 60 * 5,
  });
  return query;
}
