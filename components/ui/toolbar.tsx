"use client";

import { Row, Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ViewOptions } from "./view-options";

import { Icon } from "@/components/ui/icon";
import { useConfirm } from "@/hooks/use-confirm";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FacetedFilter } from "./faceted-filter";

interface ToolbarProps<TData> {
  table: Table<TData>;
  filterKey: string;
  filters?: {
    key: string;
    title: string;
    options: {
      id?: string;
      name: string;
    }[];
  }[];
  onDelete: (rows: Row<TData>[]) => void;
  disabled?: boolean;
}

export function Toolbar<TData>({
  table,
  filterKey,
  filters,
  onDelete,
  disabled,
}: ToolbarProps<TData>) {
  const [search, setSearch] = useState<string>("");
  const isFiltered = table.getState().columnFilters.length > 0;
  const [ConfirmDialog, confirm] = useConfirm(
    "정말로 삭제하시겠습니까?",
    "삭제된 데이터는 복구할 수 없습니다."
  );
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const filterValue = searchParams.get(filterKey) || "";
    setSearch(filterValue);
    table.getColumn(filterKey)?.setFilterValue(filterValue);
  }, [filterKey, searchParams, table]);

  const resetFilters = () => {
    const params = new URLSearchParams();
    router.push(`?${params.toString()}`);
    table.resetColumnFilters();
  };

  return (
    <div className="flex items-center justify-between">
      <ConfirmDialog />
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const params = new URLSearchParams(window.location.search);
              if (search) {
                params.set(filterKey, search);
              } else {
                params.delete(filterKey);
              }
              router.push(`?${params.toString()}`);
            }
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {filters?.map(
          (filter) =>
            table.getColumn(filter.key) && (
              <FacetedFilter
                key={filter.key}
                column={table.getColumn(filter.key)}
                title={filter.title}
                options={filter.options}
              />
            )
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={resetFilters}
            className="h-8 px-2 lg:px-3"
          >
            필터 초기화
            <X />
          </Button>
        )}
      </div>
      {table.getFilteredSelectedRowModel().rows.length > 0 && (
        <Button
          disabled={disabled}
          size={"sm"}
          variant={"outline"}
          onClick={async () => {
            const ok = await confirm();
            if (ok) {
              onDelete(table.getFilteredSelectedRowModel().rows);
              table.resetRowSelection();
            }
          }}
          className="cursor-pointer ml-auto font-normal text-xs"
        >
          <Icon.trash className="size-4" /> 삭제 (
          {table.getFilteredSelectedRowModel().rows.length})
        </Button>
      )}
      <ViewOptions table={table} />
    </div>
  );
}
