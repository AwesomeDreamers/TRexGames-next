"use client";
import { Button } from "@/components/ui/button";
import { useFindBannersAll } from "@/hooks/query/banner.queries";
import { cn } from "@/lib/utils";
import { BannerType } from "@/type/banner.type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Caroucel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const findBannersAll = useFindBannersAll().data?.payload;
  const findBannersAllLoading = useFindBannersAll().isLoading;
  const router = useRouter();

  useEffect(() => {
    if (findBannersAllLoading) return;
    const bannerTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % findBannersAll.length);
    }, 5000);

    return () => clearInterval(bannerTimer);
  }, [findBannersAllLoading, findBannersAll?.length]);

  if (findBannersAllLoading) {
    return <div>loading</div>;
  }
  return (
    <section className="relative h-[600px] overflow-hidden">
      {findBannersAll.map((banner: BannerType, index: number) => (
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            currentSlide === index ? "opacity-100" : "opacity-0"
          )}
          key={banner.id}
        >
          <div className="absolute inset-0">
            <Image
              src={banner.image.url}
              fill
              alt={`Banner ${index + 1}`}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-30" />
          </div>
          <div className="relative h-full container mx-auto  px-4 flex items-center">
            <div className="text-white space-y-6">
              <span className="text-sm uppercase tracking-wider">
                I AM JOHN
              </span>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                BEST SELLING
                <br />
                E-COMMERCE WEBSITE
              </h1>
              <p className="text-lg">
                A Creative, Flexible , Clean, Easy to use and
                <br />
                High Performance E-Commerce Theme
              </p>
              <Button
                className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg"
                onClick={() => router.push(banner.link)}
              >
                보러가기
              </Button>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {findBannersAll.map((_: any, index: number) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              currentSlide === index
                ? "bg-white w-6"
                : "bg-white/50 hover:bg-white/75"
            )}
          />
        ))}
      </div>
    </section>
  );
}
