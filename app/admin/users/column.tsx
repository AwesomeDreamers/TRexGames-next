"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { UserType } from "@/type/user.type";
import { ColumnHeader } from "../../../components/ui/column-header";
import Actions from "./actions";
export const columns: ColumnDef<UserType>[] = [
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
    accessorKey: "email",
    header: ({ column }) => <ColumnHeader column={column} title="이메일" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("email")}
          </span>
        </div>
      );
    },
    meta: {
      name: "이메일",
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => <ColumnHeader column={column} title="이름" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.original.name}</span>
        </div>
      );
    },
    meta: {
      name: "이름",
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => <ColumnHeader column={column} title="역할" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.original.role}</span>
        </div>
      );
    },
    meta: {
      name: "역할",
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions id={row.original.id} />,
  },
];
