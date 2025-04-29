"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProductImageType, ProductType } from "@/type/product.type";
import { useState } from "react";
import ProductImages from "./product-images";

type Tabs = "spec" | "images" | "review";

export default function ProductDetailTab({
  product,
}: {
  product: ProductType;
}) {
  const [tab, setTab] = useState<Tabs>("spec");

  const images: ProductImageType[] = product.images;
  return (
    <>
      <div className="w-full flex items-center justify-between md:justify-center gap-1 md:gap-10 mt-10 ">
        <Button
          variant={"outline"}
          className={cn("w-25", tab === "spec" && "bg-accent")}
          onClick={() => setTab("spec")}
        >
          사양 정보
        </Button>
        <Button
          variant={"outline"}
          className={cn("w-25", tab === "images" && "bg-accent")}
          onClick={() => setTab("images")}
        >
          이미지
        </Button>
        <Button
          variant={"outline"}
          className={cn("w-25", tab === "review" && "bg-accent")}
          onClick={() => setTab("review")}
        >
          리뷰
        </Button>
      </div>
      {tab === "spec" && (
        <div className="mt-10">
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
            사양 정보
          </p>
          <div className="flex flex-col items-center justify-between+ gap-10 mt-5 mb-4">
            <div>
              <h2 className="mb-4">최소사양</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border p-4 rounded-md">
                <div className="col-span-1 space-y-4">
                  <p>운영체제</p>
                  <p>프로세서</p>
                  <p>그래픽</p>
                  <p>메모리</p>
                  <p>저장공간</p>
                  <p>다이렉트 X</p>
                </div>
                <div className="col-span-3 space-y-4">
                  <p>{product.specs[0].os}</p>
                  <p>{product.specs[0].cpu}</p>
                  <p>{product.specs[0].gpu}</p>
                  <p>{product.specs[0].ram}</p>
                  <p>{product.specs[0].storage}</p>
                  <p>{product.specs[0].directX}</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="mb-4">권장사양</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border p-4 rounded-md">
                <div className="col-span-1 space-y-4">
                  <p>운영체제</p>
                  <p>프로세서</p>
                  <p>그래픽</p>
                  <p>메모리</p>
                  <p>저장공간</p>
                  <p>다이렉트 X</p>
                </div>
                <div className="col-span-3 space-y-4">
                  <p>{product.specs[1].os}</p>
                  <p>{product.specs[1].cpu}</p>
                  <p>{product.specs[1].gpu}</p>
                  <p>{product.specs[1].ram}</p>
                  <p>{product.specs[1].storage}</p>
                  <p>{product.specs[1].directX}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "images" && (
        <div className="flex items-center justify-center mt-10">
          <ProductImages images={images} />
        </div>
      )}
    </>
  );
}
