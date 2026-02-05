/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnDef } from "@tanstack/react-table";
import { Ban, Trash2 } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import TicketViewModal from "./view-modal";

export type Ticket = {
  id: number;
  ticketId: string;
  userName: string;
  email: string;
  date: string;
  status: "Completed" | "In Progress" | "Pending";
};

export const ticketsColumns: ColumnDef<Ticket>[] = [
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
    accessorKey: "ticketId",
    header: "Ticket ID",
    cell: ({ row }) => (
      <span className="text-sm text-foreground">{row.original.ticketId}</span>
    ),
  },
  {
    accessorKey: "userName",
    header: "User Name",
    cell: ({ row }) => (
      <span className="text-sm font-medium text-foreground">
        {row.original.userName}
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
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.date}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const variant =
        status === "Completed"
          ? "success"
          : status === "In Progress"
          ? "warning"
          : "muted";
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
        <TicketViewModal />
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
