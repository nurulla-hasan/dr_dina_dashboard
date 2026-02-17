import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

type UsersFilterProps = {
  filter: { search?: string };
  setFilter: React.Dispatch<React.SetStateAction<Partial<{ page: number; limit: number; search: string }>>>;
};

export const UsersFilter = ({ filter, setFilter }: UsersFilterProps) => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      {/* Center search + filter icon */}
      <div className="relative w-full md:w-65">
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
        <Input
          placeholder="Search by name or email"
          className="pl-9 pr-3 rounded-full"
          value={filter.search || ""}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, search: e.target.value }))
          }
        />
      </div>
    </div>
  );
};
