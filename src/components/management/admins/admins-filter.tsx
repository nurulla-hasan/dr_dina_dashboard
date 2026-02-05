import { Download, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddAdminModal from "./add-modal";

export const AdminsFilter = () => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
      
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

      <AddAdminModal />
    </div>
  );
};
