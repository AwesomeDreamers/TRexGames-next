import { findProductById } from "@/actions/product.actions";
import CartWishlistButton from "@/components/products/browse/cart-wishlist-button";
import ProductDetailTab from "@/components/products/browse/product-detail-tab";
import { Badge } from "@/components/ui/badge";
import ProductRating from "@/components/ui/product-rating";
import { currencyPrice } from "@/lib/utils";
import { ProductType } from "@/type/product.type";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number; slug: string }>;
}) {
  const { id, slug } = await params;
  const response = await findProductById(id);
  const product: ProductType = response.body;
  if (!product) notFound();
  const currentURL = `/browse/${id}/${slug}`;
  const targetURL = `/browse/${id}/${encodeURIComponent(product.slug)}`;
  if (currentURL !== targetURL) {
    redirect(targetURL);
  }

  return (
    <section className="max-w-[720px] mx-auto mt-10 mb-10 px-5 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="col-span-2 place-items-center mx-auto">
          <Image
            src={product.images[0].url}
            width={260}
            height={243}
            alt={`${product.name}`}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="col-span-2 p-5">
          <div className="flex flex-col justify-center items-center md:items-start gap-6">
            <p className="text-muted-foreground text-sm">
              {product.category.name} / {product.platform.name}
            </p>
            <h1 className="text-lg font-bold">{product.name}</h1>
            <ProductRating
              className="w-35 h-auto"
              value={product.rating}
              labelHidden
              readOnly
            />
            <p>{product.numReviews} 리뷰</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <p className="flex text-xl items-center">
                {currencyPrice(Number(product.price), Number(product.discount))}
                {Number(product.discount) > 0 && (
                  <Badge className="bg-blue-400 text-white ml-2">
                    {product.discount}%
                  </Badge>
                )}
              </p>
            </div>
            <CartWishlistButton productId={product.id} />
          </div>
        </div>
      </div>
      <div>
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
            게임 정보
          </p>
          <div className="flex items-center justify-center">
            <div
              dangerouslySetInnerHTML={{
                __html: product.description,
              }}
            />
          </div>
        </div>
        <ProductDetailTab product={product} />{" "}
      </div>
    </section>
  );
}
