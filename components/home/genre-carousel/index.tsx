"use client";
import { useEffect, useState } from "react";
import { Desktop } from "./desktop";
import { Mobile } from "./mobile";

export default function GenreCarousel() {
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

  return (
    <section className="flex flex-col lg:flex-row w-full h-auto">
      {isDesktop && <Desktop />}
      {isMobile && <Mobile />}
    </section>
  );
}
