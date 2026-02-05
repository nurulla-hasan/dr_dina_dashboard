/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProgramViewModal from "./view-modal";

export type Program = {
  id: number;
  trainerName: string;
  programName: string;
  price: string;
  views: string;
  status: "Approved" | "Decline" | "Completed";
};

export const programsColumns: ColumnDef<Program>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <label className="flex items-center gap-2 cursor-pointer select-none">
        <span className="font-semibold">Select All</span>
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
    accessorKey: "trainerName",
    header: "Trainer Name",
    cell: ({ row }) => (
      <span className="text-sm font-medium text-foreground">
        {row.original.trainerName}
      </span>
    ),
  },
  {
    accessorKey: "programName",
    header: "Program Name",
    cell: ({ row }) => (
      <span className="text-sm text-foreground">
        {row.original.programName}
      </span>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.price}
      </span>
    ),
  },
  {
    accessorKey: "views",
    header: "Views",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.views}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const variant =
        status === "Approved"
          ? "success"
          : status === "Decline"
          ? "destructive"
          : "info";
      return (
        <Badge variant={variant as any} className="rounded-full px-3 py-1">
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right pr-8">Actions</div>,
    cell: () => (
      <div className="flex items-center justify-end gap-1">
        <ProgramViewModal />
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
