import { findUsersAll } from "@/actions/user.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getQueryClient } from "@/provider/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import UsersList from "./users-list";

interface Props {
  searchParams: {
    page?: string;
    name?: string;
    [key: string]: string | string[] | undefined;
  };
}

export default async function AdminUsersPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = parseInt((params.page as string) || "1", 10);
  const take = parseInt((params.take as string) || "10", 10);
  const name = (params.name as string) || "";

  const filterOptions = {
    page,
    name,
    take,
  };

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["users", filterOptions],
    queryFn: () => findUsersAll(filterOptions),
  });
  const state = dehydrate(queryClient);

  return (
    <div className="max-w-screen mx-auto w-full pb-10">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">회원관리</CardTitle>
        </CardHeader>
        <CardContent>
          <HydrationBoundary state={state}>
            <UsersList params={filterOptions} page={page} take={take} />
          </HydrationBoundary>
        </CardContent>
      </Card>
    </div>
  );
}
