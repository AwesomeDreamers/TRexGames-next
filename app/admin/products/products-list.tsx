"use client";
import { DataTable } from "@/components/ui/data-table";
import { categories, platforms } from "@/constants/product.constants";
import {
  useDeleteProducts,
  useFindProductsAll,
} from "@/hooks/query/product.queries";
import { ProductFilterType } from "@/type/product.type";
import { toast } from "sonner";
import { columns } from "./column";

interface Props {
  page: number;
  take: number;
  params: ProductFilterType;
}

export default function ProductsList({ page, take, params }: Props) {
  const { data } = useFindProductsAll(params);
  const products = data?.payload.products;
  const totalCount = data?.payload.totalCount || 0;
  const deleteProducts = useDeleteProducts();

  const handleDelete = (rows: { original: { id?: number } }[]) => {
    const ids = rows
      .map((row) => row.original.id)
      .filter((id): id is number => id !== undefined);

    deleteProducts.mutate(ids, {
      onSuccess: (data) => {
        toast.success(data?.message);
      },
    });
  };
  const filters = [
    { key: "category", title: "카테고리", options: categories },
    { key: "platform", title: "플랫폼", options: platforms },
  ];

  return (
    <DataTable
      columns={columns}
      filterKey="name"
      filters={filters}
      page={page}
      take={take}
      totalCount={totalCount}
      data={products ?? []}
      onDelete={handleDelete}
    />
  );
}
