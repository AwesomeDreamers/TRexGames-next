"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { BannerType } from "@/type/banner.type";
import Image from "next/image";
import Link from "next/link";
import { ColumnHeader } from "../../../components/ui/column-header";
import Actions from "./actions";

export const columns: ColumnDef<BannerType>[] = [
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
    accessorKey: "image",
    header: ({ column }) => (
      <ColumnHeader column={column} title="배너 이미지" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <div className="relative w-[120px] h-[80] rounded-l bg-gray-100 overflow-hidden">
            <Image
              src={row.original.image.url}
              alt="banner image"
              fill
              className="object-cover w-full h=full"
            />
          </div>
        </div>
      );
    },
    meta: {
      name: "배너 이미지",
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => <ColumnHeader column={column} title="배너이름" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
    meta: {
      name: "배너이름",
    },
  },

  {
    accessorKey: "link",
    header: ({ column }) => <ColumnHeader column={column} title="링크" />,
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <Link href={row.original.link}>보러가기</Link>
        </div>
      );
    },
    meta: {
      name: "시작일",
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions id={row.original.id} />,
  },
];
