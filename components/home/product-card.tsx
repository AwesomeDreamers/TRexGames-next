"use client";
import { ProductType } from "@/type/product.type";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function ProductCard({ product }: { product: ProductType }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/browse/${product.id}/${product.slug}`)}
      className="relative group overflow-hidden rounded-2xl cursor-pointer"
    >
      <div className="aspect-[3/4]">
        <Image
          src={product.images[0].url}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="text-center text-white p-4">
          <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
          <p className="text-sm">
            {product.category.name} / {product.platform.name}
          </p>
        </div>
      </div>
    </div>
  );
}
