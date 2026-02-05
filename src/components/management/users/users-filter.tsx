;

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

export const UsersFilter = () => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
      {/* Left sort (Role) */}
      <Select>
        <SelectTrigger className="w-fit rounded-full border-muted-foreground/30">
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Trainer">Trainer</SelectItem>
          <SelectItem value="Individual">Individual</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-fit rounded-full border-muted-foreground/30">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Approved">Approved</SelectItem>
          <SelectItem value="Decline">Decline</SelectItem>
        </SelectContent>
      </Select>
      {/* Center search + filter icon */}
      <div className="relative w-full md:w-65">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name or email"
          className="pl-9 pr-3 rounded-full border-muted-foreground/30 bg-background"
        />
      </div>

      <Button variant="outline" className="rounded-full">
        <Download />
        Export
      </Button>
    </div>
  );
};
