/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import type { TUser } from "@/types/user.type";
import { UserAction } from "./user-action";

export const usersColumns: ColumnDef<TUser>[] = [
  {
    header: "SL",
    cell: ({ row, table }) => {
      const { pageIndex, pageSize } = table.getState().pagination;
      return (
        <span className="text-sm font-medium text-foreground">
          {pageIndex * pageSize + row.index + 1}
        </span>
      );
    },
  },
  {
    accessorKey: "fullName",
    header: "User Name",
    cell: ({ row }) => (
      <span className="text-sm font-medium text-foreground">
        {row.original.fullName}
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
    accessorKey: "createdAt",
    header: "Joined Date",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.createdAt ? format(new Date(row.original.createdAt), "dd MMM yyyy") : "N/A"}
      </span>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="rounded-full px-3 py-1 text-xs font-normal bg-primary/10 border-primary/40 text-primary capitalize"
      >
        {row.original.role}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      let variant = "default";
      if (status === "in-progress" || status === "Approved") variant = "success";
      if (status === "blocked" || status === "Decline") variant = "destructive";
      
      return (
        <Badge variant={variant as any} className="rounded-full px-3 py-1 capitalize">
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <UserAction user={row.original} />,
    enableSorting: false,
    enableHiding: false,
  },
];
