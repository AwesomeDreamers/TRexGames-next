import { Skeleton } from "@/components/ui/skeleton";
import { currencyPrice } from "@/lib/utils";
import { BannerType } from "@/type/banner.type";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Mobile({ banners }: { banners: BannerType[] }) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full">
      {isLoading ? (
        <div className="flex justify-end">
          <Skeleton className="w-[82%] h-[550px] ml-3 rounded-2xl" />
          <Skeleton className="w-[7%] ml-2 rounded-l-2xl rounded-r-none"></Skeleton>
        </div>
      ) : (
        // --- 스켈레톤 UI 끝 ---
        <>
          <Swiper
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1.2}
            spaceBetween={10}
            className="w-full h-[550px]"
          >
            {banners.map((banner, i) => (
              <SwiperSlide
                className="relative size-[30%] bg-cover bg-center overflow-hidden rounded-2xl"
                key={i}
              >
                <Link href={banner.url}>
                  <div className="absolute bottom-0 flex items-center justify-between w-full h-16 z-12 md:text-xl font-bold">
                    <p className="hidden w-[10%] h-full bg-black md:flex items-center justify-center rounded-bl-2xl">
                      할인중
                    </p>
                    <p className="w-[70%] md:w-[60%] h-full flex items-center justify-start p-3">
                      {banner.title}
                    </p>
                    <p className="hidden w-[10%] h-full bg-black md:flex items-center justify-center">
                      가격
                    </p>
                    <p className="w-[30%] md:w-[20%] h-full flex items-center justify-center">
                      {currencyPrice(banner.price)}
                    </p>
                  </div>
                  <div className="absolute bottom-0 w-full h-16 bg-[#0009] z-10 rounded-bl-2xl rounded-br-2xl"></div>
                  {/* <div className="absolute top-0 w-full h-full rounded-2xl opacity-60 bg-gradient-to-l from-transparent to-[#0B0B0B] z-10" /> */}
                  <Image
                    src={banner.images[1].url}
                    fill
                    className="object-center"
                    alt={banner.title}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
}
