"use client";

import { Download, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const TicketsFilter = () => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
      <Select>
        <SelectTrigger className="w-fit rounded-full">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
        </SelectContent>
      </Select>

      <div className="relative w-full md:w-64">
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
