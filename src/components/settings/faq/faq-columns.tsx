import type { ColumnDef } from "@tanstack/react-table";
import type { TFaq } from "@/types/faq.type";
import ActionCell from "./faq-action-cell";

export const faqColumns: ColumnDef<TFaq>[] = [
  {
    header: "Serial No.",
    accessorKey: "_id",
    cell: ({ row }) => (
      <span className="text-sm font-medium text-foreground">
        {row.index + 1}
      </span>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Ques",
    header: "Question",
    cell: ({ row }) => (
      <span className="text-sm font-medium text-foreground">
        {row.original.Ques}
      </span>
    ),
  },
  {
    accessorKey: "Answere",
    header: "Answer",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground line-clamp-2 max-w-100">
        {row.original.Answere}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right pr-2">Actions</div>,
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
