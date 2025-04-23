"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { CouponType } from "@/type/coupon.type";
import { format } from "date-fns";
import { ColumnHeader } from "../../../components/ui/column-header";
import Actions from "./actions";

export const platforms = [
  {
    name: "스팀",
  },
  {
    name: "에픽",
  },
];

export const columns: ColumnDef<CouponType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "code",
    header: ({ column }) => <ColumnHeader column={column} title="쿠폰코드" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("code")}
          </span>
        </div>
      );
    },
    meta: {
      name: "쿠폰코드",
    },
  },
  {
    accessorKey: "discount",
    header: ({ column }) => <ColumnHeader column={column} title="할인율" />,
    cell: ({ row }) => {
      const discount = parseInt(row.original.discount || "0");
      return (
        <div className="flex items-center">
          <span>{discount}%</span>
        </div>
      );
    },
    meta: {
      name: "할인율",
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => <ColumnHeader column={column} title="시작일" />,
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>{String(format(row.original.startDate, "yyyy-MM-dd"))}</span>
        </div>
      );
    },
    meta: {
      name: "시작일",
    },
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => <ColumnHeader column={column} title="종료일" />,
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>{String(format(row.original.endDate, "yyyy-MM-dd"))}</span>
        </div>
      );
    },
    meta: {
      name: "종료일",
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <ColumnHeader column={column} title="쿠폰상태" />,
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <Badge>
            {new Date() > new Date(row.original.endDate) ? "만료" : "활성화"}
          </Badge>
        </div>
      );
    },
    meta: {
      name: "쿠폰상태",
    },
  },
  {
    accessorKey: "usage",
    header: ({ column }) => <ColumnHeader column={column} title="사용건수" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>
            {row.original.usageCount}/{row.original.usageLimit}
          </span>
        </div>
      );
    },
    meta: {
      name: "사용건수",
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions id={row.original.id} />,
  },
];
