
import type { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type Admin = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export const adminsColumns: ColumnDef<Admin>[] = [
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
    header: "Admin Name",
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
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: () => (
      <div className="flex items-center justify-end gap-1">
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
