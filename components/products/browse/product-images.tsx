"use client";

import { cn } from "@/lib/utils";
import { ProductImageType } from "@/type/product.type";
import Image from "next/image";
import { useState } from "react";
import { createPortal } from "react-dom";

export default function ProductImages({
  images,
}: {
  images: ProductImageType[];
}) {
  const [current, setCurrent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="space-y-4">
      <p
        className="font-semibold mb-5"
        style={{
          backgroundImage:
            "url(https://store.fastly.steamstatic.com/public/images/v6/maincol_gradient_rule.png)",
          lineHeight: "26px",
          backgroundPosition: "bottom left",
          backgroundRepeat: "no-repeat",
        }}
      >
        이미지
      </p>
      <Image
        src={images[current + 1].url}
        alt="product Images"
        width={720}
        height={405}
        className="object-cover object-center cursor-pointer mt-5"
        onClick={() => setIsModalOpen(true)}
      />
      {isModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="relative w-full h-full max-w-[90vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[current + 1].url}
                alt="product Images"
                fill
                className="object-contain"
              />
            </div>
          </div>,
          document.body
        )}
      <div className="flex">
        {images.slice(1).map((image, index) => (
          <div
            key={image.url}
            onClick={() => setCurrent(index)}
            className={cn(
              "border-3 mr-2 cursor-pointer hover:border-blue-600",
              current === index && "border-blue-500"
            )}
          >
            <Image src={image.url} alt="images" width={180} height={100} />
          </div>
        ))}
      </div>
    </div>
  );
}
