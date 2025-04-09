import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { currencyPrice, originalPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard() {
  const product = {
    id: 6,
    src: "/swiper/6-1.avif",
    alt: "Image 6",
    genre: "액션",
    title: "몬스터 헌터 와일즈",
    price: 84800,
    discount: 25,
  };
  return (
    <Card className="mt-10 py-0 border-none w-[250] bg-transparent">
      <CardContent className="px-0 mt-0">
        <Link
          href={`/${product.id}`}
          className="block w-[250px] h-[326px] overflow-hidden rounded-2xl"
        >
          <Image
            src={product.src}
            width={250}
            height={326}
            className="transition duration-300 ease-in-out hover:brightness-125 rounded-2xl"
            alt={product.title}
          />
        </Link>
        <div className="p-2">
          <p className="text-muted-foreground text-sm">{product.genre}</p>
          <h2 className="font-bold text-md ">{product.title}</h2>
          <div className="flex justify-between items-center mt-2">
            <Badge className="bg-[#26bbff]">-25%</Badge>
            <div>
              <p className="text-muted-foreground line-through">
                {originalPrice(product.price)}
              </p>
              <p>{currencyPrice(product.price, product.discount)}</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Button variant={"outline"} className="w-[20%] cursor-pointer">
              <Icon.heart />
            </Button>
            <Button variant={"outline"} className="w-[75%] cursor-pointer">
              <Icon.cart />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
