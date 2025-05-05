import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import { SWIPERIMG } from "@/constants/home.constants";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export function Mobile() {
  const [swiperData, setSwiperData] = useState(
    SWIPERIMG.map((game) => ({ ...game, active: false }))
  );
  const [isLoading, setIsLoading] = useState(true);
  const swiperRef = useRef<any>(null);
  // const [isForward, setIsForward] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.start();
    }
  }, []);

  const handleReachEnd = () => {
    // console.log("마지막 슬라이드 장");
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop();
      swiperRef.current.params.autoplay.reverseDirection = true;
      // setIsForward(false);
      setTimeout(() => {
        swiperRef.current.autoplay.start();
      }, 500);
    }
  };

  const handleReachBeginning = () => {
    // console.log("첫번째 슬라이드 장");
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop();
      swiperRef.current.params.autoplay.reverseDirection = false;
      // setIsForward(true);
      setTimeout(() => {
        swiperRef.current.autoplay.start();
      }, 500);
    }
  };

  const toggleVideo = (index: number) => {
    setSwiperData((prev) =>
      prev.map((game, i) =>
        i === index ? { ...game, active: !game.active } : game
      )
    );
  };

  return (
    <>
      {isLoading ? (
        <Skeleton className="w-full h-[350px] rounded-[30px]" />
      ) : (
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            if (swiper.params.autoplay) {
              swiper.on("reachEnd", handleReachEnd);
              swiper.on("reachBeginning", handleReachBeginning);
              // swiper.params.autoplay.reverseDirection = !isForward;
            }
          }}
          // onBeforeDestroy={(swiper) => {
          //    if (swiper.params.autoplay) {
          //        swiper.off('reachEnd', handleReachEnd);
          //        swiper.off('reachBeginning', handleReachBeginning);
          //    }
          // }}
          effect={"coverflow"}
          grabCursor={true}
          loop={true}
          centeredSlides={true}
          slidesPerView={1}
          coverflowEffect={{
            rotate: 35,
            stretch: 200,
            depth: 250,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[EffectCoverflow, Autoplay]}
          className="w-full"
        >
          {swiperData.map((game, i) => (
            <SwiperSlide key={game.title} className="w-[550px] h-[350px]">
              <div className="relative w-full h-[350px] bg-center bg-cover p-8 overflow-hidden z-0 genre-slider">
                <div>
                  <iframe
                    className={`absolute bg-[#101014] right-0 top-0 w-[85%] h-[75%] rounded-tr-[30px] rounded-bl-[30px] border-[5px] border-transparent shadow z-[100] ${
                      game.active
                        ? "translate-y-0 opacity-100 scale-100"
                        : "-translate-y-full opacity-0 scale-0"
                    }`}
                    style={{
                      transformOrigin: "top right",
                      transition:
                        "transform 0.1s ease-in-out, opacity 0.5s ease-in-out",
                    }}
                    width={1280}
                    height={720}
                    src={game.active ? `${game.video}&autoplay=1` : undefined}
                    title={game.title}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                    allowFullScreen
                  ></iframe>
                </div>
                <Image
                  src={game.src}
                  alt={game.alt}
                  fill
                  className="absoulute left-0 top-0 size-full object-center object-cover rounded-[30px]"
                  priority
                />
                <div className="absolute bottom-5 left-8 z-[10] w-[60%]">
                  <h2
                    className="text-5xl"
                    style={{
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
                    }}
                  >
                    {game.title}
                  </h2>
                  <p
                    className="text-[#ebebeb] text-sm"
                    style={{
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
                    }}
                  >
                    {game.description}
                  </p>
                  <div className="mt-5 flex items-center">
                    <Button className="mr-5 cursor-pointer">보러가기</Button>
                    <div
                      className=" size-[50px] bg-[#ffffff33] backdrop-blur-[20px] flex justify-center items-center rounded-full text-[2.5rem] cursor-pointer"
                      onClick={() => toggleVideo(i)}
                    >
                      {game.active ? <Icon.pause /> : <Icon.play />}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}
