/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnDef } from "@tanstack/react-table";
import { Trash2, Ban } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import UserViewModal from "./view-modal";

export type User = {
  id: number;
  name: string;
  email: string;
  role: "Trainer" | "Individual";
  status: "Approved" | "Decline";
  joinedDate: string;
};

export const usersColumns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <label className="flex items-center gap-2 cursor-pointer select-none">
        <span className="font-semibold">
          Select All
        </span>
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value: boolean) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
        />
      </label>
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "User Name",
    cell: ({ row }) => (
      <span className="text-sm font-medium text-foreground">
        {row.original.name}
      </span>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.email}
      </span>
    ),
  },
  {
    accessorKey: "joinedDate",
    header: "Joined Date",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.joinedDate}
      </span>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="rounded-full px-3 py-1 text-xs font-normal bg-primary/10 border-primary/40 text-primary"
      >
        {row.original.role}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const approved = row.original.status === "Approved";
      const variant = approved ? "success" : "destructive";
      return (
        <Badge variant={variant as any} className="rounded-full px-3 py-1">
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right pr-8">Actions</div>,
    cell: () => (
      <div className="flex items-center justify-end gap-1">
        <UserViewModal />
        <Button
          variant="outline"
          size="icon"
          className="text-amber-500 hover:text-amber-600"
        >
          <Ban />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="text-red-500 hover:text-red-600"
        >
          <Trash2 />
        </Button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
