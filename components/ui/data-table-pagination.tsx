import { Table } from "@tanstack/react-table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PaginationWithLinks } from "./pagenation-with-links";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  page: number;
  take: number;
  totalCount: number;
}

export function DataTablePagination<TData>({
  table,
  page,
  take,
  totalCount,
}: DataTablePaginationProps<TData>) {
  const [pageSize, setPageSize] = useState<number>(
    table.getState().pagination.pageSize
  );
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    const takeFromUrl = searchParams.get("take");
    if (takeFromUrl) {
      const takeValue = Number(takeFromUrl);
      setPageSize(takeValue);
      table.setPageSize(takeValue);
    }
  }, [searchParams, table]);

  return (
    <div className="flex items-center justify-center md:justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground hidden md:flex">
        {table.getFilteredSelectedRowModel().rows.length}개 선택됨.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              const newPageSize = Number(value);
              setPageSize(newPageSize);
              table.setPageSize(newPageSize);
              const currentParams = new URLSearchParams(
                searchParams.toString()
              );
              currentParams.set("take", value);
              router.push(`?${currentParams.toString()}`);
            }}
          >
            <SelectTrigger className="h-8 w-[70px] hidden md:flex">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <PaginationWithLinks page={page} take={take} totalCount={totalCount} />
      </div>
    </div>
  );
}
