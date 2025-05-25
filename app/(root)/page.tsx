import {
  findLatestProductsAll,
  findPopularProductsAll,
  findSwiperBannersAll,
} from "@/actions/home.actions";
import { auth } from "@/auth";
import Carousel from "@/components/home/carousel";
import GenreCarousel from "@/components/home/genre-carousel";
import ProductsList from "@/components/home/products-list";
import { getQueryClient } from "@/provider/get-query-client";
// import Caroucel from "@/components/home/caroucel";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const latestProductsQueryKey = ["products", "latest"];
export const popularProductsQueryKey = ["products", "popular"];

export default async function Home() {
  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["banners"],
      queryFn: findSwiperBannersAll,
    }),
    queryClient.prefetchQuery({
      queryKey: ["products", "latest"],
      queryFn: findLatestProductsAll,
    }),
    queryClient.prefetchQuery({
      queryKey: ["products", "popular"],
      queryFn: findPopularProductsAll,
    }),
  ]);
  const state = dehydrate(queryClient);

  const session = await auth();
  console.log(session);

  return (
    <HydrationBoundary state={state}>
      <div className="relative min-h-screen flex flex-col gap-16 py-8">
        {/* <Caroucel /> */}
        <div className="min-h-[600px]">
          <Carousel />
        </div>
        <div className="min-h-[350px]">
          <GenreCarousel />
        </div>
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-semibold mb-8">최신 상품</h2>
          <ProductsList queryKey={latestProductsQueryKey} />
        </div>

        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-semibold mb-8">인기 상품</h2>
          <ProductsList queryKey={popularProductsQueryKey} />
        </div>
      </div>
    </HydrationBoundary>
  );
}
