import { findProductById } from "@/actions/product.actions";
import { ProductType } from "@/type/product.type";
import { notFound, redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ id: number }>;
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const response = await findProductById(id);
  const product: ProductType = response?.payload;
  if (!product) notFound();
  redirect(`/browse/${id}/${encodeURIComponent(product.slug)}`);
}
