import { Button } from "@/components/ui/button";
import QtyButton from "@/components/ui/qty-button";
import { currencyPrice, originalPrice } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import Image from "next/image";

export default function CartItem({ product }: any) {
  return (
    <div className="w-full bg-[#28282c] flex items-center p-4 rounded-xl">
      <div className="w-[30%]">
        <Image src={product.banner} width={60} height={85} alt={product.alt} />
      </div>
      <div className="w-[70%] flex flex-col items-start">
        <div className="flex items-center justify-between w-full">
          <h2>{product.title}</h2>
          <Button
            size={"icon"}
            className="focus-visible:ring-0 cursor-pointer rounded-full text-muted-foreground"
            variant={"ghost"}
          >
            <Trash2 />
          </Button>
        </div>
        <div className="flex items-end justify-between w-full mt-2">
          <QtyButton />
          <div className="flex flex-col">
            <p className="text-muted-foreground line-through text-sm text-right ml-2">
              {originalPrice(product.price)}
            </p>
            <p className="ml-2">
              {currencyPrice(product.price, product.discount)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
