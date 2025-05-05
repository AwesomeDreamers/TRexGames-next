import { Skeleton } from "@/components/ui/skeleton";
import { currencyPrice } from "@/lib/utils";
import { BannerType } from "@/type/banner.type";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperRef } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Desktop({ banners }: { banners: BannerType[] }) {
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const slideRef = useRef<SwiperRef | null>(null);

  const goToSlide = (index: number) => {
    if (slideRef.current) {
      slideRef.current.slideTo(index);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full lg:flex lg:flex-row lg:justify-between lg:container lg:mx-auto px-4 py-2">
      {isLoading ? (
        <>
          <Skeleton className="w-full lg:w-[80%] h-[600px] max-h-[600px] rounded-2xl" />
          <div className="w-full lg:w-[20%] h-auto ml-0 lg:ml-4 mt-4 lg:mt-0">
            <ul className="flex flex-row justify-center lg:flex-col gap-2">
              {[...Array(6)].map((_, i) => (
                <li key={i} className="w-[16.6%] lg:w-full">
                  <div className="flex flex-col lg:flex-row items-center h-full rounded-xl py-5">
                    <div className="w-[30px] h-[40px] sm:w-[40px] sm:h-[53.3px] mx-2.5 flex-shrink-0">
                      <Skeleton className="w-full h-full" />
                    </div>
                    <Skeleton className="w-2/3 h-4 mt-3 lg:mt-0 lg:ml-2" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <>
          <Swiper
            onSwiper={(swiper) => (slideRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            autoplay={{ delay: 6700, disableOnInteraction: false }}
            modules={[Autoplay]}
            loop
            className="w-full lg:w-[80%] h-[600px] max-h-[600px]"
          >
            {banners.map((banner, i) => (
              <SwiperSlide
                className="relative size-full overflow-hidden"
                key={i}
              >
                <Link href={banner.url}>
                  <div className="absolute bottom-0 flex items-center justify-between w-full h-16 text-xl font-bold z-12">
                    <p className="w-[10%] h-full bg-black flex items-center justify-center rounded-bl-2xl">
                      할인중
                    </p>
                    <p className="w-[60%] h-full flex items-center justify-start p-3">
                      {banner.title}
                    </p>
                    <p className="w-[10%] h-full bg-black flex items-center justify-center">
                      가격
                    </p>
                    <p className="w-[20%] h-full flex items-center justify-center">
                      {currencyPrice(banner.price)}
                    </p>
                  </div>
                  <div className="absolute bottom-0 w-full h-16 bg-[#0009] rounded-bl-2xl rounded-br-2xl z-10"></div>
                  <div className="absolute top-0 w-full h-full rounded-2xl opacity-60 bg-gradient-to-l from-transparent to-[#0B0B0B] z-11" />
                  <Image
                    src={banner.images[0].url}
                    fill
                    className="object-cover rounded-2xl"
                    alt={banner.title}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="w-full lg:w-[20%] h-auto ml-0 lg:ml-4 mt-4 lg:mt-0">
            <ul className="flex flex-row justify-center lg:flex-col gap-2">
              {banners.map((banner, i) => (
                <li
                  key={i}
                  onClick={() => goToSlide(i)}
                  className="relative w-[16.6%] lg:w-full h-full"
                >
                  {i === activeIndex && (
                    <div
                      className={`progress-bar ${
                        i === activeIndex ? "active" : ""
                      }`}
                    />
                  )}
                  <div
                    className={`flex flex-col lg:flex-row items-center h-full rounded-xl py-5 hover:bg-[#28282c] cursor-pointer ${
                      i === activeIndex ? "bg-[#28282c]" : ""
                    }`}
                  >
                    <div className="relative w-[30px] h-[40px] sm:w-[40px] sm:h-[53.3px] mx-2.5">
                      <Image
                        src={banner.images[1].url}
                        fill
                        className="object-cover"
                        alt={banner.title}
                      />
                    </div>
                    <p className="z-[1] text-sm sm:text-base mt-3 lg:mt-0">
                      {banner.title}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
