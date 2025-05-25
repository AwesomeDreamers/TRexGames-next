"use client";
import { useFindSwiperBannersAll } from "@/hooks/query/home.queries";
import { BannerType } from "@/type/banner.type";
import { useEffect, useState } from "react";
import Desktop from "./desktop";
import Mobile from "./mobile";

export default function Carousel() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 756);
      setIsMobile(window.innerWidth <= 756);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data } = useFindSwiperBannersAll();
  const banners: BannerType[] = data?.body || [];

  return (
    <section className="flex flex-col lg:flex-row w-full h-auto mt-8">
      {isDesktop && <Desktop banners={banners} />}
      {isMobile && <Mobile banners={banners} />}
    </section>
  );
}
