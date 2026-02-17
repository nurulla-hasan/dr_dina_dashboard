/* eslint-disable @typescript-eslint/no-explicit-any */

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CreateCourseModal } from "./create-course-modal";

interface CoursesFilterProps {
  filter: any;
  setFilter: (filter: any) => void;
}

export const CoursesFilter = ({ filter, setFilter }: CoursesFilterProps) => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      {/* Center search + filter icon */}
      <div className="relative w-full md:w-65">
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
        <Input
          placeholder="Search by name or email"
          className="pl-9 pr-3 rounded-full"
          value={filter.searchTerm || ""}
          onChange={(e) =>
            setFilter((prev: any) => ({ ...prev, searchTerm: e.target.value }))
          }
        />
      </div>
      

      <CreateCourseModal />
    </div>
  );
};
