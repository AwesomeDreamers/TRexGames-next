import { findBannersAll } from "@/actions/banner.actions";
import AddButton from "@/components/admin/add-button";
import BannersList from "@/components/admin/banners/banners-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface Props {
  searchParams: {
    take?: string;
    page?: string;
    title?: string;
    [key: string]: string | string[] | undefined;
  };
}

export default async function AdminBannerPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = parseInt((params.page as string) || "1", 10);
  const take = parseInt((params.take as string) || "10", 10);
  const title = (params.title as string) || "";

  const filterOptions = {
    page,
    title,
    take,
  };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["banners", filterOptions],
    queryFn: () => findBannersAll(filterOptions),
  });
  const state = dehydrate(queryClient);

  return (
    <div className="max-w-screen mx-auto w-full pb-10">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">배너관리</CardTitle>
          <AddButton label="배너 추가" action={"bannerOpen"} />
        </CardHeader>
        <CardContent>
          <HydrationBoundary state={state}>
            <BannersList params={filterOptions} />
          </HydrationBoundary>
        </CardContent>
      </Card>
    </div>
  );
}
