
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { TCourse } from "@/types/course.type";
import { formatDate } from "@/lib/utils";

export const coursesColumns: ColumnDef<TCourse>[] = [
  {
    accessorKey: "className",
    header: "Class",
    cell: ({ row }) => (
      <span className="text-sm font-medium text-foreground">
        {row.original.className}
      </span>
    ),
  },
  {
    accessorKey: "subjectName",
    header: "Subject",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={row.original.image} alt={row.original.subjectName} />
          <AvatarFallback>{row.original.subjectName.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium text-foreground">
          {row.original.subjectName}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "totalEnrolled",
    header: "Enrolled",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.totalEnrolled}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      let variant = "default";
      if (status === "active") variant = "success";
      if (status === "inactive") variant = "destructive";
      if (status === "Pending") variant = "warning";

      return (
        <Badge variant={variant as any} className="rounded-full px-3 py-1 capitalize">
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatDate(row.original.createdAt)}
      </span>
    ),
  },
];
