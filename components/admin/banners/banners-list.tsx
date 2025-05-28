"use client";
import { columns } from "@/app/admin/banners/column";
import { DataTable } from "@/components/ui/data-table";
import { Icon } from "@/components/ui/icon";
import {
  useDeleteBanners,
  useFindBannersAll,
} from "@/hooks/query/banner.queries";
import { toast } from "sonner";

interface Props {
  params: {
    page: number;
    take: number;
    title: string;
  };
}

export default function BannersList({ params }: Props) {
  const { data, isLoading } = useFindBannersAll(params);
  const findBannersAll = data?.banners;
  const totalCount = data?.totalCount;
  const deleteBanners = useDeleteBanners();
  const handleDelete = (rows: { original: { id?: string } }[]) => {
    const ids = rows
      .map((row) => row.original.id)
      .filter((id): id is string => id !== undefined);

    deleteBanners.mutate(ids, {
      onSuccess: (data) => {
        toast.success(data?.message);
      },
    });
  };

  if (isLoading)
    return (
      <div className="h-[500px] w-full flex items-center justify-center">
        <Icon.loading className="size-6 text-slate-300 animate-spin" />
      </div>
    );
  return (
    <DataTable
      columns={columns}
      filterKey="title"
      page={params.page}
      take={params.take}
      totalCount={totalCount}
      data={findBannersAll}
      onDelete={handleDelete}
    />
  );
}
