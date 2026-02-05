/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnDef } from "@tanstack/react-table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export type Subscription = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  startDate: string;
  expireDate: string;
  plan: string;
  amount: string;
  referrals: number;
  status: "Active" | "Expired";
};

export const subscriptionsColumns: ColumnDef<Subscription>[] = [
  {
    accessorKey: "profile",
    header: "Profile",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar> 
          <AvatarImage src={row.original.avatar} alt={row.original.name} />
          <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">
            {row.original.name}
          </span>
          <span className="text-xs text-muted-foreground">
            {row.original.email}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.startDate}
      </span>
    ),
  },
  {
    accessorKey: "expireDate",
    header: "Expire Date",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.expireDate}
      </span>
    ),
  },
  {
    accessorKey: "plan",
    header: "Plan",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.plan}
      </span>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.amount}
      </span>
    ),
  },
  {
    accessorKey: "referrals",
    header: "Referrals",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.referrals}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const variant = status === "Active" ? "success" : "destructive";
      return (
        <Badge variant={variant as any} className="rounded-full px-3 py-1">
          {status}
        </Badge>
      );
    },
  },
];

