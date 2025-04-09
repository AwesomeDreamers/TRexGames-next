import { currencyPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

const SWIPERIMG = [
  {
    src: "/swiper/1-1.avif",
    alt: "Image 1",
    title: "가이더스 제로",
    price: 12500,
  },
  {
    src: "/swiper/2-1.avif",
    alt: "Image 2",
    title: "퍼스트 버서커: 카잔",
    price: 64800,
  },
  {
    src: "/swiper/3-1.avif",
    alt: "Image 3",
    title: "라이즈 오브 더 로닌",
    price: 77520,
  },
  {
    src: "/swiper/4-1.avif",
    alt: "Image 4",
    title: "어쌔신 크리드: 썌도우",
    price: 52800,
  },
  {
    src: "/swiper/5-1.avif",
    alt: "Image 5",
    title: "더 라스트 오브 어스 파트 II 리마스터드",
    price: 58800,
  },
  {
    src: "/swiper/6-1.avif",
    alt: "Image 6",
    title: "몬스터 헌터 와일즈",
    price: 84800,
  },
];

export default function Mobile() {
  return (
    <>
      <Swiper
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1.2}
        spaceBetween={10}
        className="w-full h-[440px]"
      >
        {SWIPERIMG.map((img, i) => (
          <SwiperSlide
            className="relative size-[30%] bg-cover bg-center"
            key={i}
          >
            <Link href="/ss">
              <div className="absolute bottom-0 flex items-center justify-between w-full h-16 z-12 md:text-xl font-bold">
                <p className="hidden w-[10%] h-full bg-black md:flex items-center justify-center rounded-bl-2xl">
                  판매중
                </p>
                <p className="w-[70%] md:w-[60%] h-full flex items-center justify-start p-3">
                  {img.title}
                </p>
                <p className="hidden w-[10%] h-full bg-black md:flex items-center justify-center">
                  가격
                </p>
                <p className="w-[30%] md:w-[20%] h-full flex items-center justify-center">
                  {currencyPrice(img.price, 0)}
                </p>
              </div>
              <div className="absolute bottom-0 w-full h-16 bg-[#0009] z-10 rounded-bl-2xl rounded-br-2xl"></div>
              {/* <div className="absolute top-0 w-full h-full rounded-2xl opacity-60 bg-gradient-to-l from-transparent to-[#0B0B0B] z-10" /> */}
              <Image
                src={img.src}
                fill
                className="object-cover object-center rounded-2xl"
                alt={img.alt}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
