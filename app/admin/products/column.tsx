"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { currencyPrice } from "@/lib/utils";
import { ProductType } from "@/type/product.type";
import { ColumnHeader } from "../../../components/ui/column-header";
import Actions from "./actions";

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

export const columns: ColumnDef<ProductType>[] = [
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
    accessorKey: "name",
    header: ({ column }) => <ColumnHeader column={column} title="상품 이름" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
    meta: {
      name: "상품 이름",
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => <ColumnHeader column={column} title="카테고리" />,
    cell: ({ row }) => {
      const category = categories.find(
        (category) => category.name === row.original.category.name
      );

      if (!category) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          <span>{category.name}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.original.category.name);
    },
    meta: {
      name: "카테고리",
    },
  },
  {
    accessorKey: "platform",
    header: ({ column }) => <ColumnHeader column={column} title="플랫폼" />,
    cell: ({ row }) => {
      const platform = platforms.find(
        (platform) => platform.name === row.original.platform.name
      );

      if (!platform) {
        return null;
      }

      return (
        <div className="flex items-center">
          <span>{platform.name}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.original.platform.name);
    },
    meta: {
      name: "플랫폼",
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => <ColumnHeader column={column} title="가격" />,
    cell: ({ row }) => {
      const price = parseInt(row.original.price);
      const discount = parseInt(row.original.discount || "0");
      return (
        <div className="flex items-center">
          <span>{currencyPrice(price, discount)}</span>
        </div>
      );
    },
    meta: {
      name: "가격",
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
    accessorKey: "rating",
    header: ({ column }) => <ColumnHeader column={column} title="평점" />,
    cell: ({ row }) => {
      const rating = row.original.rating;
      return (
        <div className="flex items-center">
          <span>{rating}</span>
        </div>
      );
    },
    meta: {
      name: "평점",
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions id={row.original.id} />,
  },
];
