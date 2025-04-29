import { Badge } from "@/components/ui/badge";
import { currencyPrice } from "@/lib/utils";
import { ProductType } from "@/type/product.type";
import Image from "next/image";
import Link from "next/link";
import CartButton from "./cart-wishlist-button";

interface ProductCardProps {
  product: ProductType;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className=" max-w-3xs md:max-w-sm rounded relative w-full">
      <Link href={`browse/${product.id}/${product.slug}`}>
        <div className="relative w-full h-[46vh] group">
          <Image
            src={product.images?.[0]?.url!}
            alt={product.name}
            fill
            className="rounded-xl"
          />
          {Number(product.discount) > 0 && (
            <div className="absolute top-2 left-2">
              <Badge className="bg-blue-400 text-white">
                {product.discount}%
              </Badge>
            </div>
          )}
          <div className="absolute top-2 right-2">
            <Badge className="bg-blue-400 text-white">
              {product.category.name}
            </Badge>
          </div>
          <div className="absolute bottom-0 bg-black/40 w-full flex justify-between items-center gap-1">
            <h2 className="font-bold text-white text-xl line-clamp-1 w-full">
              {product.name}
            </h2>
            <div className="py-1 px-2 bg-[#161921] rounded-sm">
              <p className="text-white text-sm font-bold capitalize w-6.5">
                {product.platform.name}
              </p>
            </div>
          </div>
        </div>
      </Link>
      <div className="py-1 flex flex-col gap-1">
        <div className="flex gap-4 items-center justify-between py-2">
          <div className="flex flex-row gap-2 items-center">
            <p className="text-base text-white font-bold">
              {currencyPrice(Number(product.price), Number(product.discount))}
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Image
              src="/images/reviews.svg"
              alt="reviews"
              width={20}
              height={20}
              className="object-contain"
            />
            <p className="text-base text-white font-bold">
              {product.numReviews}
            </p>
            <Image
              src="/images/star.svg"
              alt="star"
              width={18}
              height={18}
              className="object-contain"
            />
            <p className="text-base font-bold text-[#FFAD49]">
              {product.rating}
            </p>
          </div>
        </div>

        <CartButton productId={product.id} />
      </div>
    </div>
  );
}
