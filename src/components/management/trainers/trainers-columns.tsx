/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnDef } from "@tanstack/react-table";
import { Ban } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TrainerViewModal from "./view-modal";
import SubscriptionFeeModal from "./subscription-fee-modal";

export type Trainer = {
  id: number;
  name: string;
  email: string;
  image: string;
  views: string;
  subscriptionFee: string;
  status: "Approved" | "Rejected" | "Pending";
};

export const trainersColumns: ColumnDef<Trainer>[] = [
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
    accessorKey: "image",
    header: "Trainer Image",
    cell: ({ row }) => (
      <Avatar>
        <AvatarImage src={row.original.image} alt={row.original.name} />
        <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: "name",
    header: "Trainer Name",
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
    accessorKey: "views",
    header: "Views",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.views}
      </span>
    ),
  },
  {
    accessorKey: "subscriptionFee",
    header: () => <div className="text-center">Subscription Fee</div>,
    cell: ({ row }) => (
      <div className="text-center text-muted-foreground tracking-widest">
        {row.original.subscriptionFee}
      </div>
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
          : status === "Rejected"
          ? "destructive"
          : "warning";
      return (
        <Badge variant={variant as any} className="rounded-full px-3 py-1">
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right pr-14">Actions</div>,
    cell: () => (
      <div className="flex items-center justify-end gap-1">
        <TrainerViewModal />
        <SubscriptionFeeModal />
        <Button
          variant="outline"
          size="icon"
          className="text-amber-500 hover:text-amber-600"
        >
          <Ban />
        </Button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
