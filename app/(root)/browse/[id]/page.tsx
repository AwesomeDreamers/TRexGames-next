import ProductDetailTab from "@/components/store/product/product-detail-tab";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import ProductRating from "@/components/ui/product-rating";
import { product } from "@/lib/constants";
import { currencyPrice } from "@/lib/utils";
import Image from "next/image";

export default async function ProductDetailPage(props: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await props.params;
  // const product = await getProductById(id);

  // if (!product) notFound();
  return (
    <section className="max-w-[720px] mx-auto mt-10 mb-10">
      <div className="grid grid-cols-2 md:grid-cols-4">
        <div className="col-span-2 place-items-center">
          <Image
            src={product.banner}
            width={260}
            height={243}
            alt="product CoverImage"
          />
        </div>
        <div className="col-span-2 p-5">
          <div className="flex flex-col gap-6">
            <p className="text-muted-foreground text-sm">
              {product.category.category} / {product.platform.platform}
            </p>
            <h1 className="text-lg font-bold">{product.title}</h1>
            <ProductRating
              className="w-35 h-auto"
              value={product.rating}
              readOnly
            />
            <p>{product.numReviews} 리뷰</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <p className="text-xl">
                {currencyPrice(product.price, product.discount)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant={"outline"} className="cursor-pointer">
                <Icon.heart />
              </Button>
              <Button variant={"outline"} className="cursor-pointer">
                <Icon.cart /> 장바구니 추가
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ProductDetailTab product={product} />{" "}
      </div>
    </section>
  );
}
