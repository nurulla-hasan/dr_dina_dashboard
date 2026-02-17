"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AddFAQModal from "./add-faq-modal";

type FAQFilterProps = {
  filter: { search?: string };
  setFilter: React.Dispatch<
    React.SetStateAction<
      Partial<{ page: number; limit: number; search: string }>
    >
  >;
};

export const FAQFilter = ({ filter, setFilter }: FAQFilterProps) => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="relative w-full md:w-64">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search FAQ..."
          className="pl-9 rounded-full"
          value={filter.search || ""}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, search: e.target.value }))
          }
        />
      </div>

      <AddFAQModal />
    </div>
  );
};
