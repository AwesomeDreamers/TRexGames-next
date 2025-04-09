import { currencyPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Swiper as SwiperRef } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const SWIPERIMG = [
  {
    src: "/swiper/1.avif",
    alt: "Image 1",
    title: "가이더스 제로",
    price: 12500,
  },
  {
    src: "/swiper/2.avif",
    alt: "Image 2",
    title: "퍼스트 버서커: 카잔",
    price: 64800,
  },
  {
    src: "/swiper/3.avif",
    alt: "Image 3",
    title: "라이즈 오브 더 로닌",
    price: 77520,
  },
  {
    src: "/swiper/4.avif",
    alt: "Image 4",
    title: "어쌔신 크리드: 썌도우",
    price: 52800,
  },
  {
    src: "/swiper/5.avif",
    alt: "Image 5",
    title: "더 라스트 오브 어스 파트 II 리마스터드",
    price: 58800,
  },
  {
    src: "/swiper/6.avif",
    alt: "Image 6",
    title: "몬스터 헌터 와일즈",
    price: 84800,
  },
];
const SWIPERIMG2 = [
  { src: "/swiper/1-1.avif", alt: "Image 1", title: "가이더스 제로" },
  { src: "/swiper/2-1.avif", alt: "Image 2", title: "퍼스트 버서커: 카잔" },
  { src: "/swiper/3-1.avif", alt: "Image 3", title: "라이즈 오브 더 로닌" },
  { src: "/swiper/4-1.avif", alt: "Image 4", title: "어쌔신 크리드: 썌도우" },
  {
    src: "/swiper/5-1.avif",
    alt: "Image 5",
    title: "더 라스트 오브 어스 파트 II 리마스터드",
  },
  { src: "/swiper/6-1.avif", alt: "Image 6", title: "몬스터 헌터 와일즈" },
];

export default function Desktop() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideRef = useRef<SwiperRef | null>(null);

  const goToSlide = (index: number) => {
    if (slideRef.current) {
      slideRef.current.slideTo(index);
    }
  };
  return (
    <>
      <Swiper
        onSwiper={(swiper) => (slideRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        autoplay={{ delay: 6700, disableOnInteraction: false }}
        modules={[Autoplay]}
        loop
        className="w-full lg:w-[80%] h-[600px] max-h-[600px]"
      >
        {SWIPERIMG.map((img, i) => (
          <SwiperSlide className="relative size-full overflow-hidden" key={i}>
            <Link href="/ss">
              <div className="absolute bottom-0 flex items-center justify-between w-full h-16 z-12 text-xl font-bold">
                <p className="w-[10%] h-full bg-black flex items-center justify-center rounded-bl-2xl">
                  판매중
                </p>
                <p className="w-[60%] h-full flex items-center justify-start p-3">
                  {img.title}
                </p>
                <p className="w-[10%] h-full bg-black flex items-center justify-center">
                  가격
                </p>
                <p className="w-[20%] h-full flex items-center justify-center">
                  {currencyPrice(img.price, 0)}
                </p>
              </div>
              <div className="absolute bottom-0 w-full h-16 bg-[#0009] z-10 rounded-bl-2xl rounded-br-2xl"></div>
              <div className="absolute top-0 w-full h-full rounded-2xl opacity-60 bg-gradient-to-l from-transparent to-[#0B0B0B] z-11" />
              <Image
                src={img.src}
                fill
                className="object-cover rounded-2xl"
                alt={img.alt}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="w-full lg:w-[20%] h-auto ml-0 lg:ml-4 mt-4 lg:mt-0">
        <ul className="flex flex-row justify-center lg:flex-col gap-2">
          {SWIPERIMG2.map((img, i) => (
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
                    src={img.src}
                    fill
                    className="object-cover"
                    alt={img.alt}
                  />
                </div>
                <p className="z-10 text-sm sm:text-base mt-3 lg:mt-0">
                  {img.title}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
