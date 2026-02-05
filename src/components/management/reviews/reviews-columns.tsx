import type { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReviewViewModal from "./view-modal";

export type Review = {
  id: number;
  name: string;
  avatar: string;
  email: string;
  review: string;
  rating: number;
};

const renderStars = (rating: number) => {
  const full = "★".repeat(rating);
  const empty = "☆".repeat(5 - rating);
  return (
    <span className="text-amber-400 text-sm tracking-tight">
      {full}
      <span className="text-muted-foreground/40">{empty}</span>
    </span>
  );
};

export const reviewsColumns: ColumnDef<Review>[] = [
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
    accessorKey: "avatar",
    header: "Profile",
    cell: ({ row }) => (
      <Avatar>
        <AvatarImage src={row.original.avatar} alt={row.original.name} />
        <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
      </Avatar>
    ),
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
    accessorKey: "review",
    header: "Reviews",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground truncate max-w-xs">
        {row.original.review}
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
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => renderStars(row.original.rating),
  },
  {
    id: "actions",
    header: () => <div className="text-right pr-4">Actions</div>,
    cell: () => (
      <div className="flex items-center justify-end gap-1">
        <ReviewViewModal />
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
