"use client";
import { DataTable } from "@/components/ui/data-table";
import {
  useDeleteManyUsers,
  useFindUsersAll,
} from "@/hooks/query/user.queries";
import { columns } from "./column";

interface Props {
  page: number;
  take: number;
  params: { name?: string };
}

export default function UsersList({ page, take, params }: Props) {
  const { name } = params;
  const { data } = useFindUsersAll({ name, page, take });
  const users = data.users;
  const totalCount = data.totalCount || 0;
  const deleteManyUsers = useDeleteManyUsers();

  const handleDelete = (rows: { original: { id?: string } }[]) => {
    const ids = rows
      .map((row) => row.original.id)
      .filter((id): id is string => id !== undefined);

    deleteManyUsers.mutate(ids);
  };

  return (
    <DataTable
      columns={columns}
      filterKey="name"
      page={1}
      take={10}
      totalCount={totalCount}
      data={users ?? []}
      onDelete={handleDelete}
    />
  );
}
