;

import { Download, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

export const TrainersFilter = () => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
      {/* Left Filters */}

      <Select>
        <SelectTrigger className="w-fit rounded-full">
          <SelectValue placeholder="Trainer Filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Approved</SelectItem>
          <SelectItem value="inactive">Pending</SelectItem>
          <SelectItem value="decline">Rejected</SelectItem>
        </SelectContent>
      </Select>

        {/* Search with Filter Icon */}
        <div className="relative w-full md:w-65">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or specialty"
            className="pl-9 rounded-full"
          />
        </div>
       <Button variant="outline" className="rounded-full">
        <Download />
        Export
      </Button>
    </div>
  );
};
