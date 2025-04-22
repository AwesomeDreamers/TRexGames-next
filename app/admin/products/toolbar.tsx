"use client";

import { Row, Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ViewOptions } from "./view-options";

import { Icon } from "@/components/ui/icon";
import { useConfirm } from "@/hooks/use-confirm";
import { FacetedFilter } from "./faceted-filter";

interface ToolbarProps<TData> {
  table: Table<TData>;
  filterKey: string;
  onDelete: (rows: Row<TData>[]) => void;
  disabled?: boolean;
}

export const categories = [
  {
    name: "액션",
  },
  {
    name: "RPG",
  },
  {
    name: "어드벤처",
  },
  {
    name: "FPS",
  },
  { name: "캐주얼" },
  {
    name: "전략",
  },
  {
    name: "호러",
  },
  {
    name: "서바이벌",
  },
  {
    name: "퍼즐",
  },
  {
    name: "스포츠",
  },
];

export const platforms = [
  {
    name: "스팀",
  },
  {
    name: "에픽",
  },
];

export function Toolbar<TData>({
  table,
  filterKey,
  onDelete,
  disabled,
}: ToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [ConfirmDialog, confirm] = useConfirm(
    "정말로 삭제하시겠습니까?",
    "삭제된 데이터는 복구할 수 없습니다."
  );

  return (
    <div className="flex items-center justify-between">
      <ConfirmDialog />
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="검색..."
          value={(table.getColumn(filterKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(filterKey)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("category") && (
          <FacetedFilter
            column={table.getColumn("category")}
            title="카테고리"
            options={categories}
          />
        )}
        {table.getColumn("platform") && (
          <FacetedFilter
            column={table.getColumn("platform")}
            title="플랫폼"
            options={platforms}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
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
