
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import type { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { TCourse } from "@/types/course.type";
import { formatDate } from "@/lib/utils";
import { CourseAction } from "./course-action";

export const coursesColumns: ColumnDef<TCourse>[] = [
  {
    accessorKey: "className",
    header: "Class",
    cell: ({ row }) => (
      <Link to={`/courses/${row.original._id}`} className="text-sm font-medium text-foreground hover:underline">
        {row.original.className}
      </Link>
    ),
  },
  {
    accessorKey: "subjectName",
    header: "Subject",
    cell: ({ row }) => (
      <Link to={`/courses/${row.original._id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
        <Avatar>
          <AvatarImage src={row.original.image} alt={row.original.subjectName} />
          <AvatarFallback>{row.original.subjectName.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium text-foreground">
          {row.original.subjectName}
        </span>
      </Link>
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
      if (status === "Active") variant = "success";
      if (status === "Pending") variant = "warning";
      if (status === "Complete") variant = "secondary";

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
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => (
      <div className="flex justify-end">
        <CourseAction course={row.original} />
      </div>
    ),
  },
];
